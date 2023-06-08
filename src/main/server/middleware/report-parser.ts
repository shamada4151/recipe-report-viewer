import fs from 'fs'
import path from 'path'

import type { RequestHandler } from 'express'
import * as cheerio from 'cheerio'
import { getActivities, getOutputs, hasErrorOnOutput } from '@main/lib/report'
import { reportEventEmitter } from '@main/api/roots/report'
import { ScrolledMessage, TransitionMessage } from 'src/types'

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
      addActivityId($)
      addErrorClass($)

      addScrollMonitor($)

      // 解析結果を反映したいたいめ最後に実行する
      notifyActivitiesId($)

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
  function buildMessage(href: string): TransitionMessage {
    return {
      type: 'PAGE_TRANSITION',
      body: {
        location: href
      }
    }
  }
  // ページ遷移を通知するためのイベントを追加
  $('body').append(`
    <script>
      window.addEventListener('load', function() {
        ${buildMessage.toString()}
        window.parent.postMessage(buildMessage(window.location.href), "*");
      });
    </script>
  `)
}

const addActivityId = ($: cheerio.CheerioAPI): void => {
  const activities = getActivities($)
  activities.each((i, activity) => {
    const id = $(activity)
      .find('.panel-title > a')
      .first()
      .text()
      .replace(/\[\d+\]/, '')
      .trim()
      .replaceAll(' ', '_')
      .replaceAll('#', '')
      .toLowerCase()

    // 同じアクティビティで id の重複を避ける
    $(activity).attr('id', `${id}_${i}`)
  })
}

const addErrorClass = ($: cheerio.CheerioAPI): void => {
  const activities = getActivities($)
  activities.each((_, activity) => {
    getOutputs($(activity)).each((_, collapse) => {
      if (hasErrorOnOutput($(collapse).text())) {
        $(activity).addClass('error')
      }
    })
  })
}

const notifyActivitiesId = ($: cheerio.CheerioAPI): void => {
  const activities = getActivities($)

  reportEventEmitter.emit(
    'activities',
    activities
      .map((_, activity) => {
        return {
          id: activity.attribs['id'],
          hasError: hasErrorOnOutput(getOutputs($(activity)).text())
        }
      })
      .toArray()
  )
}

const addScrollMonitor = ($: cheerio.CheerioAPI): void => {
  const intersection = 'intersection'
  // Intersection 監視用の Element を最上位に追加する
  $('.container-fluid').wrap(
    $(`<div id="${intersection}"></div>`).css({
      overflow: 'auto',
      width: '100%',
      height: '100vh'
    })
  )

  function observeScroll(): void {
    function buildMessage(id: string): ScrolledMessage {
      return {
        type: 'SCROLLED',
        body: {
          id: id
        }
      }
    }

    const contents = document.querySelectorAll('.panel')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.parent.postMessage(buildMessage(e.target.id), '*')
          }
        })
      },
      {
        root: document.querySelector('#intersection'),
        // Activity が最上部に到達する直前に通知したいので、1% 下に境界を引く
        rootMargin: '-1% 0px -99% 0px'
      }
    )

    contents.forEach((content) => {
      observer.observe(content)
    })
  }

  // ページ遷移を通知するためのイベントを追加
  $('body').append(`
    <script>
      window.addEventListener('load', ${observeScroll.toString()})
    </script>
  `)
}
