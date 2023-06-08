import { FC } from 'react'
import Box from '@mui/material/Box'

import { usePagePath } from '@renderer/providers/PagePathProvider'
import Header from './Header'
import Stack from '@mui/material/Stack'

type Props = {
  root: string
}
const ReportView: FC<Props> = ({ root }) => {
  const [path] = usePagePath()

  return (
    <Box width="100%" height="100%" display="block" boxSizing="border-box">
      <Stack height="100%">
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <iframe src={new URL(path, root).href} width="100%" height="100%" />
        </Box>
      </Stack>
    </Box>
  )
}

export default ReportView
