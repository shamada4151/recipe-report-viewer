import { FC } from 'react'
import { SearchQueryProvider } from './SearchProvider'
import SidePanel from './SidePanel'

type Props = {
  root: string
}
const Component: FC<Props> = ({ root }) => {
  return (
    <SearchQueryProvider>
      <SidePanel root={root} />
    </SearchQueryProvider>
  )
}

export default Component
