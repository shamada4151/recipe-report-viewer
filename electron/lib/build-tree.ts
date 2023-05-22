import fs from 'fs'
import path from 'path'

import * as cheerio from 'cheerio'

export type TreeItem = {
  title: string
  href: string
  children?: Array<TreeItem>
}

export const buildReportTree = async (startPath: string, parent?: string): Promise<TreeItem> => {
  const result: TreeItem = { title: '', href: '' }
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
        result.title = await getReportTitle(filePath)
        result.href = path.join(parent || '', file)
      }
    })
  )

  // サブレシピの順序を保つために、ここで Promise.all で同期する
  result.children = (await Promise.all(children)).filter((child) => child.title !== '')

  return result
}

const getReportTitle = async (filePath: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return null
      }

      const $ = cheerio.load(data)
      // headタグ内のbaseタグを検索し、target属性が"_blank"のものを削除する
      const title = $('h3[class="panel-title"] a').first().text().trim()
      resolve(title)
    })
  })
}
