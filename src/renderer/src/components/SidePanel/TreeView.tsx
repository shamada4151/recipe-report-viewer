import { FC, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import { usePagePath } from '@renderer/providers/PagePathProvider'
import { useSearchQuery } from './SearchProvider'
import { TreeItem } from '../../../../types'

const splitText = (text: string, query: string): { pref: string; matched: string; suf: string } => {
  const queryIndex = text.toLowerCase().indexOf(query.toLowerCase())

  if (!query || queryIndex === -1) {
    return { pref: text, matched: '', suf: '' }
  }

  const pref = text.slice(0, queryIndex)
  const matched = text.slice(queryIndex, queryIndex + query.length)
  const suf = text.slice(queryIndex + query.length)

  return { pref, matched, suf }
}

const HighlightedText = styled('span')(
  ({ theme }) => `
  background-color: ${theme.palette.warning.main}
`
)

const HighlightText: FC<{ text: string }> = ({ text }) => {
  const [query] = useSearchQuery()
  const [searched, setSearched] = useState({ pref: text, matched: '', suf: '' })

  useEffect(() => {
    setSearched(splitText(text, query))
  }, [text, query])

  return (
    <>
      {searched.pref}
      {searched.matched && <HighlightedText>{searched.matched}</HighlightedText>}
      {searched.suf}
    </>
  )
}

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
          <HighlightText text={item.report.title} />
        </Typography>
      </ListItemButton>
      {item.children?.map((child) => (
        <TreeView key={child.href} item={child} depth={depth + 1} />
      ))}
    </List>
  )
}

export default TreeView
