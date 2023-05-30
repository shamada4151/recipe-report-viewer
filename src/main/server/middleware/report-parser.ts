import fs from 'fs'
import path from 'path'

import type { RequestHandler } from 'express'
import * as cheerio from 'cheerio'

export const ReportParserMiddleware = (root: string): RequestHandler => {
  return (req, res, next) => {
    // css や js などもこのミドルウェアを通るため
    if (req.path.endsWith('.html') === false) {
      next()
      return
    }

    fs.readFile(path.join(root, req.path), 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        next() // ファイルが見つからなければ、次のミドルウェアに引き渡す
        return
      }

      const $ = cheerio.load(data)
      removeLinkTarget($)
      addLoadedEventHandler($)

      // 解析後のHTMLをレスポンスとして返す
      res.send($.html())
    })
  }
}

const removeLinkTarget = ($: cheerio.CheerioAPI): void => {
  // リンクを新しいウィンドウで開かないようにする
  $('head base[target="_blank"]').remove()
}

const addLoadedEventHandler = ($: cheerio.CheerioAPI): void => {
  // ページ遷移を通知するためのイベントを追加
  $('body').append(`
    <script>
      window.onload = function() {
        window.parent.postMessage(window.location.href, "*");
      }
    </script>
  `)
}
