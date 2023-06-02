import { FC } from 'react'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'

import ReportView from '@renderer/components/ReportView'
import SidePanel from '@renderer/components/SidePanel'
import { trpc } from '@renderer/utils/trpc'

const Home: FC = () => {
  const { data: server, isLoading, mutate } = trpc.report.open.useMutation()
  const { data: latest } = trpc.report.latest.useQuery()
  const { data: history, isLoading: isLoadingHistory } = trpc.report.recently.useQuery()

  const openReport = (root?: string): void => {
    mutate({ root })
  }

  if (!server?.port) {
    return (
      <Stack direction="column" spacing={4} alignItems="center" p={4}>
        <Stack direction="column" spacing={2} alignItems="center">
          <Typography variant="h1">Automation Center Report Viewer</Typography>
          <Typography>Report file is not selected, please click below button</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={(): void => openReport()}>
              Open Report test
            </Button>
            <Button
              variant="outlined"
              onClick={(): void => {
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
                <ListItemButton
                  dense
                  disableGutters
                  key={item}
                  onClick={(): void => openReport(item)}
                >
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
      <SidePanel root={server.root} />
      <Box height="100%" sx={{ flexGrow: 1 }}>
        <ReportView root={`http://127.0.0.1:${server.port}`} />
      </Box>
    </Stack>
  )
}

export default Home
