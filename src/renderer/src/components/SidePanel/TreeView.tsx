import { FC } from 'react'
import { TreeItem } from '../../../../types'
import { usePagePath } from '@renderer/providers/PagePathProvider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

type Props = {
  item: TreeItem
  depth?: number
}
const TreeView: FC<Props> = ({ item, depth = 0 }) => {
  const [path, setPath] = usePagePath()

  const handleClick = (): void => {
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
