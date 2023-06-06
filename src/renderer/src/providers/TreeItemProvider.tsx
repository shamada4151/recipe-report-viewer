import { trpc } from '@renderer/utils/trpc'
import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { TreeItem } from 'src/types'

const TreeItemContext = createContext<TreeItem | null>(null)

type Props = PropsWithChildren & {
  directory: string
}
export const TreeItemProvider: FC<Props> = ({ children, directory }) => {
  const { data: tree } = trpc.report.tree.useQuery({ root: directory })

  return <TreeItemContext.Provider value={tree?.item || null}>{children}</TreeItemContext.Provider>
}

export const useTreeItem = (): TreeItem | null => {
  return useContext(TreeItemContext)
}
