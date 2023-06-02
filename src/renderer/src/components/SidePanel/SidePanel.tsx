import { FC } from 'react'
import Box from '@mui/material/Box'

import { trpc } from '@renderer/utils/trpc'
import TreeView from './TreeView'

type Props = {
  root: string
}
const SidePanel: FC<Props> = ({ root }) => {
  const { data: tree } = trpc.report.tree.useQuery({ root })

  return (
    <Box height="100%" width="12rem" maxWidth="12rem" overflow="scroll">
      {tree?.item && <TreeView item={tree.item} />}
    </Box>
  )
}

export default SidePanel
