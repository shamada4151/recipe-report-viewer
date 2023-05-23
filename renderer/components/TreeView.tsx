import { FC } from 'react'
import { TreeItem } from '../../electron/lib/build-tree'
import { Box, List, ListItem, Typography } from '@mui/material'

type Props = {
  item: TreeItem
}
const TreeView: FC<Props> = ({ item }) => {
  return (
    <List disablePadding>
      <ListItem disablePadding dense>
        <Typography variant="subtitle2" noWrap overflow="visible">
          {item.title} - {item.href}
        </Typography>
      </ListItem>
      {item.children?.map((child) => (
        <Box pl={2}>
          <TreeView key={child.href} item={child} />
        </Box>
      ))}
    </List>
  )
}

export default TreeView
