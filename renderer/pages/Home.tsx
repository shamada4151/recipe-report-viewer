import { useEffect } from 'react'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import TreeView from '../components/TreeView'
import { trpc } from '../utils/trpc'
import ReportView from '../components/ReportView'

const Home = () => {
  const { data: server, isLoading, mutate } = trpc.report.open.useMutation()
  const { data: tree, refetch } = trpc.report.tree.useQuery({ root: server?.root || '' })

  const handleClick = () => {
    mutate()
  }

  useEffect(() => {
    if (server?.root) {
      refetch()
    }
  }, [server?.root])

  if (!server?.port) {
    return (
      <Stack direction="column" spacing={2} alignItems="center" p={4}>
        <Typography variant="h1">Automation Center Report Viewer</Typography>
        <Typography>Report file is not selected, please click below button</Typography>
        <Button variant="contained" onClick={handleClick}>
          Open Report
        </Button>
      </Stack>
    )
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Stack direction="row" height="100%">
      <Box height="100%" width="12rem" maxWidth="12rem" overflow="scroll">
        {tree?.tree && <TreeView item={tree.tree} />}
      </Box>
      <Box height="100%" sx={{ flexGrow: 1 }}>
        <ReportView root={`http://127.0.0.1:${server.port}`} />
      </Box>
    </Stack>
  )
}

export default Home
