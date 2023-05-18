import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../electron/api/router'

export const trpc = createTRPCReact<AppRouter>()
