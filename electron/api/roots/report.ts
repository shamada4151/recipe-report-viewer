import { openReport } from '../../lib/open-report'
import { router, procedure } from '../trpc'

export const reportRouter = router({
  test: procedure.query(() => {
    return { test: 'test' }
  }),
  open: procedure.mutation(async () => {
    return {
      port: await openReport(),
    }
  }),
})
