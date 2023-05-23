import { TRPCProvider } from './providers/tRPCProvider'
import Home from './pages/Home'
import MUIProvider from './providers/MUIProvider'
import { PagePathProvider } from './providers/PagePathProvider'

export const App = () => {
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
