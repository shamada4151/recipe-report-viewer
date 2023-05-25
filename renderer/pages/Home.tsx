import { useEffect } from 'react'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import TreeView from '../components/TreeView'
import { trpc } from '../utils/trpc'
import ReportView from '../components/ReportView'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'

const Home = () => {
  const { data: server, isLoading, mutate } = trpc.report.open.useMutation()
  const { data: latest } = trpc.report.latest.useQuery()
  const { data: tree, refetch } = trpc.report.tree.useQuery({ root: server?.root || '' })
  const { data: history, isLoading: isLoadingHistory } = trpc.report.recently.useQuery()

  const openReport = (root?: string) => {
    mutate({ root })
  }

  useEffect(() => {
    if (server?.root) {
      refetch()
    }
  }, [server?.root])

  if (!server?.port) {
    return (
      <Stack direction="column" spacing={4} alignItems="center" p={4}>
        <Stack direction="column" spacing={2} alignItems="center">
          <Typography variant="h1">Automation Center Report Viewer</Typography>
          <Typography>Report file is not selected, please click below button</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => openReport()}>
              Open Report
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                if (!latest?.root) {
                  alert("Latest report doe's not exist!!")
                  return
                }
                openReport(latest.root)
              }}
            >
              Open Latest
            </Button>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="h3">Open Recent</Typography>
          {isLoadingHistory ? (
            <CircularProgress />
          ) : (
            <List>
              {history?.history.map((item) => (
                <ListItemButton dense disableGutters key={item} onClick={() => openReport(item)}>
                  <Typography variant="caption">{item}</Typography>
                </ListItemButton>
              ))}
            </List>
          )}
        </Stack>
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