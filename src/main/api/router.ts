import { router } from './trpc'
import { reportRouter } from './roots/report'

export const appRouter = router({
  report: reportRouter
})
