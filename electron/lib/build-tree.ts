import fs from 'fs'
import path from 'path'

import * as cheerio from 'cheerio'

type ReportInfo = {
  title: string
  error?: boolean
}
export type TreeItem = {
  report: ReportInfo
  href: string
  children?: Array<TreeItem>
}

export const buildReportTree = async (startPath: string, parent?: string): Promise<TreeItem> => {
  const result: TreeItem = { report: { title: '' }, href: '' }
  const children: Array<Promise<TreeItem>> = []

  const files = fs.readdirSync(startPath)
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(startPath, file)

      const stat = fs.lstatSync(filePath)

      if (stat.isDirectory()) {
        // 再帰的にサブディレクトリを探索
        children.push(buildReportTree(filePath, path.join(parent || '', file)))
      } else if (file === 'Report.html') {
        result.report = await parseReport(filePath)
        result.href = path.join(parent || '', file)
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
        return null
      }

      const $ = cheerio.load(data)
      const error = findError($)
      // headタグ内のbaseタグを検索し、target属性が"_blank"のものを削除する
      const title = getReportTitle($)
      resolve({ title, error })
    })
  })
}

const getReportTitle = (doc: cheerio.CheerioAPI) => {
  return doc('h3[class="panel-title"] a').first().text().trim()
}

const ERROR_KEYS = ['Exception:', 'Traceback', 'Error:']

const findError = (doc: cheerio.CheerioAPI) => {
  let result = false
  doc('div[id]').each((_, elm) => {
    const $ = doc(elm)
    if ($.attr('id')?.startsWith('collapse_output')) {
      if (ERROR_KEYS.some((key) => $.text().includes(key))) {
        result = true
        return false
      }
    }
  })

  return result
}
