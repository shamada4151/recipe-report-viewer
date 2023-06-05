import { router } from './trpc'
import { reportRouter } from './roots/report'
import { issuesRouter } from './roots/issues'
import { menuRouter } from './roots/menu'

export const appRouter = router({
  report: reportRouter,
  issues: issuesRouter,
  menu: menuRouter
})
