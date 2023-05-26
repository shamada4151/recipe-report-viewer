import { FC } from 'react'
import { TRPCProvider } from '@renderer/providers/tRPCProvider'
import Home from '@renderer/pages/Home'
import MUIProvider from '@renderer/providers/MUIProvider'
import { PagePathProvider } from '@renderer/providers/PagePathProvider'

export const App: FC = () => {
  return (
    <TRPCProvider>
      <MUIProvider>
        <PagePathProvider>
          <Home />
        </PagePathProvider>
      </MUIProvider>
    </TRPCProvider>
  )
}
