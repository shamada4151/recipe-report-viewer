import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react'

const PagePathContext = createContext('/Report.html')
const SetPagePathContext = createContext<Dispatch<SetStateAction<string>>>(() => {
  throw new Error('SetPagePathContext is not implemented')
})

export const PagePathProvider: FC<PropsWithChildren> = ({ children }) => {
  const [path, setPath] = useState('/Report.html')

  return (
    <PagePathContext.Provider value={path}>
      <SetPagePathContext.Provider value={setPath}>{children}</SetPagePathContext.Provider>
    </PagePathContext.Provider>
  )
}

/**
 *
 * @returns path: Web サーバー上の相対パス
 */
export const usePagePath = (): readonly [string, (newPath: string) => void] => {
  const path = useContext(PagePathContext)
  const setPagePath = useContext(SetPagePathContext)

  const setPath = useCallback(
    (newPath: string) => {
      console.log(newPath)
      if (newPath !== path) {
        setPagePath(newPath)
      }
    },
    [path]
  )

  return [path, setPath] as const
}
