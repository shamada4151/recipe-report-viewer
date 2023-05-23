import { FC } from 'react'
import { TreeItem } from '../../electron/lib/build-tree'
import { List, ListItemButton, Typography } from '@mui/material'
import { usePagePath } from '../providers/PagePathProvider'

type Props = {
  item: TreeItem
  depth?: number
}
const TreeView: FC<Props> = ({ item, depth = 0 }) => {
  const [path, setPath] = usePagePath()

  const handleClick = () => {
    setPath(item.href)
  }

  return (
    <List disablePadding>
      <ListItemButton
        dense
        disableGutters
        selected={item.href === path}
        onClick={handleClick}
        sx={{ pl: 1 + depth * 2 }}
      >
        <Typography
          variant="subtitle2"
          noWrap
          overflow="visible"
          color={item.report.error ? 'error' : 'inherit'}
        >
          {item.report.title}
        </Typography>
      </ListItemButton>
      {item.children?.map((child) => (
        <TreeView key={child.href} item={child} depth={depth + 1} />
      ))}
    </List>
  )
}

export default TreeView
