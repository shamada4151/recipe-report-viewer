import { FC } from 'react'

import Home from '@renderer/pages/Home'
import MUIProvider from '@renderer/providers/MUIProvider'
import { TRPCProvider } from '@renderer/providers/tRPCProvider'
import { PagePathProvider } from '@renderer/providers/PagePathProvider'
import { AlertMessageProvider } from './components/Alert'
import { IssueFormProvider } from './components/IssueForm'

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
