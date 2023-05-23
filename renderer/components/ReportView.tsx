import { FC } from 'react'
import Box from '@mui/material/Box'

import { usePagePath } from '../providers/PagePathProvider'

type Props = {
  root: string
}
const ReportView: FC<Props> = ({ root }) => {
  const [path] = usePagePath()
  return (
    <Box width="100%" height="100%" display="block" boxSizing="border-box">
      <iframe src={`${root}/${path}`} height="100%" width="100%" />
    </Box>
  )
}

export default ReportView
