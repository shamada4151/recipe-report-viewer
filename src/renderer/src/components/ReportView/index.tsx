import { FC } from 'react'
import { ReportMessageProvider } from './ReportMessageProvider'

import ReportView from './ReportView'

type Props = {
  origin: string
}
const Component: FC<Props> = ({ origin }) => {
  return (
    <ReportMessageProvider origin={origin}>
      <ReportView root={origin} />
    </ReportMessageProvider>
  )
}

export default Component
