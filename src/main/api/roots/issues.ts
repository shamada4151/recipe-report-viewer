import { observable } from '@trpc/server/observable'
import { EventEmitter } from 'events'

import { router, procedure } from '../trpc'
import { z } from 'zod'
import { createIssues } from '@main/lib/github'

export const issueEventEmitter = new EventEmitter()

export const issuesRouter = router({
  open: procedure.subscription(() => {
    return observable((emit) => {
      function onOpen(): void {
        // 実行されたことを通知するだけなので空オブジェクトを通知
        emit.next({})
      }

      issueEventEmitter.on('open', onOpen)

      return (): void => {
        issueEventEmitter.off('open', onOpen)
      }
    })
  }),
  create: procedure
    .input(
      z.object({
        title: z.string(),
        body: z.string().optional()
      })
    )
    .mutation((opts) => {
      const { title, body } = opts.input
      createIssues({ title, body })
    })
})
