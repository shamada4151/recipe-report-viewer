import fs from 'fs'
import { AddressInfo } from 'net'

import { BrowserWindow } from 'electron'
import { z } from 'zod'

import { router, procedure } from '../trpc'
import { buildReportTree } from '../../lib/build-tree'
import { getLatestReportDir, launchServer } from '../../lib/open-report'
import { getDirBySelectingFile } from '../../lib/openDialog'
import { getRecentlyOpened, readReportStorage, setOpened } from '../../lib/report-storage'
import { TreeItem } from 'src/types'

type OpenResponse = {
  /**
   * html 表示用サーバーのポート番号
   * 立ち上げ失敗時は 0 を返す
   */
  port: number
  /**
   * 開いたレポートファイルの root directory
   * 立ち上げ失敗時は Empty String を返す
   */
  root: string
}

type TreeResponse = {
  item: TreeItem | null
}

export const reportRouter = router({
  open: procedure
    .input(
      z.object({
        root: z.string().optional()
      })
    )
    .mutation<OpenResponse>(async (opts) => {
      let root = opts.input.root
      const window = BrowserWindow.getFocusedWindow()
      if (window === null) {
        return {
          port: 0,
          root: ''
        }
      }
      if (root === undefined || fs.existsSync(root) === false) {
        root = await getDirBySelectingFile(window)
      }

      const server = await launchServer(root)
      window.on('close', () => {
        server.close()
      })

      setOpened(root)

      return {
        port: (server.address() as AddressInfo).port,
        root
      }
    }),
  latest: procedure.query(async () => {
    const root = getLatestReportDir()
    return {
      root
    }
  }),
  tree: procedure
    .input(
      z.object({
        root: z.string()
      })
    )
    .query<TreeResponse>(async (opts) => {
      const { root } = opts.input
      if (!root) {
        return { item: null }
      }
      const tree = await buildReportTree(root)
      return { item: tree }
    }),
  recently: procedure.query(async () => {
    const folders = (await getRecentlyOpened())
      .map((file) => {
        const data = readReportStorage(file)
        return data?.folder
      })
      .filter((value): value is string => typeof value === 'string')
    return {
      history: folders
    }
  })
})
