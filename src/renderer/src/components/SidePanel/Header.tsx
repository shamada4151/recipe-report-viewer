import { FC, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'

import { useSearchQuery } from './SearchProvider'

const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useSearchQuery()

  const toggleOpen = useCallback(() => {
    setOpen((val) => !val)
    setQuery('')
  }, [])

  return (
    <Box px={0.5}>
      <Box>
        <Stack direction="row" justifyContent="end">
          <IconButton aria-label="search-tree" size="small" onClick={toggleOpen}>
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Box>
      <Collapse in={open}>
        <TextField
          variant="outlined"
          size="small"
          margin="none"
          placeholder="search..."
          inputProps={{
            style: {
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 8,
              paddingRight: 8
            }
          }}
          value={query}
          onChange={(e): void => setQuery(e.target.value)}
        />
      </Collapse>
    </Box>
  )
}

export default Header
