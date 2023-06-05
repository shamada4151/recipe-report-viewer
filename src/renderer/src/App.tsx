import { FC } from 'react'
import { TRPCProvider } from '@renderer/providers/tRPCProvider'
import Home from '@renderer/pages/Home'
import MUIProvider from '@renderer/providers/MUIProvider'
import { PagePathProvider } from '@renderer/providers/PagePathProvider'
import { IssueFormProvider } from './providers/IssueFormProvider'
import { AlertMessageProvider } from './components/Alert/AlertMessageProvider'

export const App: FC = () => {
  return (
    <TRPCProvider>
      <MUIProvider>
        <AlertMessageProvider>
          <PagePathProvider>
            <IssueFormProvider>
              <Home />
            </IssueFormProvider>
          </PagePathProvider>
        </AlertMessageProvider>
      </MUIProvider>
    </TRPCProvider>
  )
}
