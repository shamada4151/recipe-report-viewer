import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import { usePagePath } from '@renderer/providers/PagePathProvider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Header: FC = () => {
  const [path] = usePagePath()
  console.log(path)
  const crumbs = useMemo<Array<string>>(() => {
    return path.split('/').filter((item) => item && item !== 'Report.html')
  }, [path])
  return (
    <Box px={1}>
      <Stack direction="row">
        <Breadcrumbs>
          {crumbs.map((item) => (
            <Link key={item}>{item}</Link>
          ))}
          <Typography>test</Typography>
        </Breadcrumbs>
      </Stack>
    </Box>
  )
}

export default Header
