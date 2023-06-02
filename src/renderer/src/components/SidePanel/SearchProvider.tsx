import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

const QueryContext = createContext('')
const SetQueryContext = createContext<Dispatch<SetStateAction<string>>>(() => {
  throw new Error('Not wrapped SearchQueryProvider')
})

export const SearchQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [query, setQuery] = useState('')
  return (
    <QueryContext.Provider value={query}>
      <SetQueryContext.Provider value={setQuery}>{children}</SetQueryContext.Provider>
    </QueryContext.Provider>
  )
}

export const useSearchQuery = (): readonly [string, Dispatch<SetStateAction<string>>] => {
  const query = useContext(QueryContext)
  const setQuery = useContext(SetQueryContext)

  return [query, setQuery] as const
}
