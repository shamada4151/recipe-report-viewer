import { AddressInfo } from 'net'
import { z } from 'zod'

import { router, procedure } from '../trpc'
import { buildReportTree } from '../../lib/build-tree'
import { launchServer } from '../../lib/open-report'
import { BrowserWindow } from 'electron'
import { getDirBySelectingFile } from '../../lib/openDialog'

export const reportRouter = router({
  open: procedure.mutation(async () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window === null) {
      return {
        port: '',
        root: '',
      }
    }

    const root = await getDirBySelectingFile(window)
    const server = await launchServer(root)

    window.on('close', () => {
      server.close()
    })

    return {
      port: (server.address() as AddressInfo).port,
      root,
    }
  }),
  tree: procedure
    .input(
      z.object({
        root: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { root } = opts.input
      const tree = await buildReportTree(root)

      return { tree }
    }),
})
