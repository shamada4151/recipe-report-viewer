import { router, procedure } from '../trpc'
import { z } from 'zod'

import { buildContextMenu } from '@main/lib/context-menu'

export const menuRouter = router({
  show: procedure
    .input(
      z.object({
        report: z.string().optional()
      })
    )
    .mutation(({ input }) => {
      buildContextMenu(input.report).popup()
    })
})
