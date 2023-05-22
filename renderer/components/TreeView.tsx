import { FC } from 'react'
import { TreeItem } from '../../electron/lib/build-tree'

type Props = {
  item: TreeItem
}
const TreeView: FC<Props> = ({ item }) => {
  return (
    <ul>
      <li>
        {item.title} - {item.href}
      </li>
      {item.children?.map((child) => (
        <TreeView item={child} />
      ))}
    </ul>
  )
}

export default TreeView
