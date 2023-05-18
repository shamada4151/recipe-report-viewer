import { FC, PropsWithChildren, useState } from 'react'
import { ipcLink } from 'electron-trpc/renderer'
import superjson from 'superjson'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpc as trpc } from '../utils/trpc'

export const TRPCProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [ipcLink()],
      transformer: superjson,
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
