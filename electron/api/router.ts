import z from 'zod'
import { observable } from '@trpc/server/observable'
import { EventEmitter } from 'events'
import { procedure, router } from './trpc'
import { reportRouter } from './roots/report'

const ee = new EventEmitter()

export const appRouter = router({
  greeting: procedure.input(z.object({ name: z.string() })).query((req) => {
    const { input } = req

    ee.emit('greeting', `Greeted ${input.name}`)
    return {
      text: `Hello ${input.name}` as const,
    }
  }),
  subscription: procedure.subscription(() => {
    return observable((emit) => {
      function onGreet(text: string) {
        emit.next({ text })
      }

      ee.on('greeting', onGreet)

      return () => {
        ee.off('greeting', onGreet)
      }
    })
  }),
  test: procedure.input(z.object({ name: z.string() })).query((req) => {
    const { input } = req

    return {
      text: `Hello ${input.name}` as const,
    }
  }),
  report: reportRouter,
})

export type AppRouter = typeof appRouter
