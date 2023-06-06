import { FC } from 'react'
import { SearchQueryProvider } from './SearchProvider'
import SidePanel from './SidePanel'

const Component: FC = () => {
  return (
    <SearchQueryProvider>
      <SidePanel />
    </SearchQueryProvider>
  )
}

export default Component
