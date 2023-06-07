import fs from 'fs'
import path from 'path'

import * as cheerio from 'cheerio'
import { TreeItem, ReportInfo } from '../../types'
import { getOutputs, hasErrorOnOutput } from './report'

export const buildReportTree = async (startPath: string, parent = ''): Promise<TreeItem> => {
  const result: TreeItem = { report: { title: '' }, href: '' }
  const children: Array<Promise<TreeItem>> = []

  const files = fs.readdirSync(startPath)
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(startPath, file)

      const stat = fs.lstatSync(filePath)

      if (stat.isDirectory()) {
        // 再帰的にサブディレクトリを探索
        children.push(buildReportTree(filePath, new URL(file, `relative://${parent}/`).pathname))
      } else if (file === 'Report.html') {
        result.report = await parseReport(filePath)
        result.href = new URL(file, `relative://${parent}/`).pathname
      }
    })
  )

  // サブレシピの順序を保つために、ここで Promise.all で同期する
  result.children = (await Promise.all(children)).filter((child) => child.href !== '')

  return result
}

const parseReport = async (filePath: string): Promise<ReportInfo> => {
  return new Promise<ReportInfo>((resolve) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        resolve({ title: 'Unknown' })
        return
      }

      const $ = cheerio.load(data)
      const error = hasError($)
      // headタグ内のbaseタグを検索し、target属性が"_blank"のものを削除する
      const title = getReportTitle($)
      resolve({ title, error })
      return
    })
  })
}

const getReportTitle = (doc: cheerio.CheerioAPI): string => {
  return doc('h3[class="panel-title"] a').first().text().trim()
}

const hasError = (doc: cheerio.CheerioAPI): boolean => {
  return getOutputs(doc('body'))
    .toArray()
    .some((elm) => hasErrorOnOutput(doc(elm).text()))
}
