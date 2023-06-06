import { FC } from 'react'
import Box from '@mui/material/Box'

import TreeView from './TreeView'
import Stack from '@mui/material/Stack'
import Header from './Header'
import { useTreeItem } from '@renderer/providers/TreeItemProvider'

const SidePanel: FC = () => {
  const tree = useTreeItem()

  return (
    <Box height="100%" width="12rem" maxWidth="12rem" overflow="scroll">
      <Stack>
        <Header />
        {tree && <TreeView item={tree} />}
      </Stack>
    </Box>
  )
}

export default SidePanel
