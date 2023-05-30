import fs from 'fs'
import path from 'path'

import { RequestHandler } from 'express'
import * as cheerio from 'cheerio'

export const ReportParserMiddleware = (root: string): RequestHandler => {
  return (req, res, next) => {
    const filePath = path.join(root, req.path)

    if (filePath.endsWith('.html') === false) {
      next()
      return
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        next() // ファイルが見つからなければ、次のミドルウェアに引き渡す
        return
      }

      const $ = cheerio.load(data)
      // headタグ内のbaseタグを検索し、target属性が"_blank"のものを削除する
      $('head base[target="_blank"]').remove()
      $('body').append(`
        <script>
          window.onload = function() {
            window.parent.postMessage(window.location.href, "*");
          }
        </script>
      `)

      // 解析後のHTMLをレスポンスとして返す
      res.send($.html())
    })
  }
}
