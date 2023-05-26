import fs from 'fs'
import { AddressInfo } from 'net'

import { BrowserWindow } from 'electron'
import { z } from 'zod'

import { router, procedure } from '../trpc'
import { buildReportTree } from '../lib/build-tree'
import { getLatestReportDir, launchServer } from '../lib/open-report'
import { getDirBySelectingFile } from '../lib/openDialog'
import { getRecentlyOpened, readReportStorage, setOpened } from '../lib/report-storage'

export const reportRouter = router({
  open: procedure
    .input(
      z.object({
        root: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      let root = opts.input.root
      const window = BrowserWindow.getFocusedWindow()
      if (window === null) {
        return {
          port: 0,
          root: '',
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
        root,
      }
    }),
  latest: procedure.query(async () => {
    const root = getLatestReportDir()
    return {
      root,
    }
  }),
  tree: procedure
    .input(
      z.object({
        root: z.string(),
      })
    )
    .query(async (opts) => {
      const { root } = opts.input
      if (!root) {
        return { tree: null }
      }
      const tree = await buildReportTree(root)
      return { tree }
    }),
  recently: procedure.query(async () => {
    const folders = (await getRecentlyOpened())
      .map((file) => {
        const data = readReportStorage(file)
        return data?.folder
      })
      .filter((value): value is string => typeof value === 'string')
    return {
      history: folders,
    }
  }),
})
