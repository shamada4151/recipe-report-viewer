import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

const PagePathContext = createContext('Report.html')
const SetPagePathContext = createContext<Dispatch<SetStateAction<string>>>(() => {
  throw new Error('SetPagePathContext is not implemented')
})

export const PagePathProvider: FC<PropsWithChildren> = ({ children }) => {
  const [path, setPath] = useState('Report.html')

  return (
    <PagePathContext.Provider value={path}>
      <SetPagePathContext.Provider value={setPath}>{children}</SetPagePathContext.Provider>
    </PagePathContext.Provider>
  )
}

export const usePagePath = () => {
  const path = useContext(PagePathContext)
  const setPath = useContext(SetPagePathContext)

  return [path, setPath] as const
}
