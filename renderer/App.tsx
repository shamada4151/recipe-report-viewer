import { TRPCProvider } from './providers/tRPCProvider'
import { HelloElectron } from './Hello'

export const App = () => {
  return (
    <TRPCProvider>
      <HelloElectron />
    </TRPCProvider>
  )
}
