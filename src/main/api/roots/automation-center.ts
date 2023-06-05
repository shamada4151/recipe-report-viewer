import { getAutomationCenterSettings } from '@main/common/ac-config'
import { router, procedure } from '../trpc'
import { openAutomationCenter } from '@main/lib/automation-center'
import { z } from 'zod'

export const automationCenterRouter = router({
  open: procedure
    .input(
      z.object({
        path: z.string().optional()
      })
    )
    .mutation(({ input }) => {
      console.log(input.path)
      const settings = getAutomationCenterSettings()
      if (settings === null) {
        alert('AutomationCenter settings does not exist')
      }

      openAutomationCenter()
    })
})
