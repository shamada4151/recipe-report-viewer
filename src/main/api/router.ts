import { router } from './trpc'
import { reportRouter } from './roots/report'
import { issuesRouter } from './roots/issues'

export const appRouter = router({
  report: reportRouter,
  issues: issuesRouter
})
