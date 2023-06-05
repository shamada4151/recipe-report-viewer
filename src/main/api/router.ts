import { router } from './trpc'
import { reportRouter } from './roots/report'
import { issuesRouter } from './roots/issues'
import { automationCenterRouter } from './roots/automation-center'

export const appRouter = router({
  report: reportRouter,
  issues: issuesRouter,
  automationCenter: automationCenterRouter
})
