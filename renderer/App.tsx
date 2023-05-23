import { TRPCProvider } from './providers/tRPCProvider'
import Home from './pages/Home'
import MUIProvider from './providers/MUIProvider'

export const App = () => {
  return (
    <TRPCProvider>
      <MUIProvider>
        <Home />
      </MUIProvider>
    </TRPCProvider>
  )
}
