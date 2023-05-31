import { FC, FormEventHandler, useCallback, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { trpc } from '@renderer/utils/trpc'
import Alert from '@mui/material/Alert'

type Props = {
  open: boolean
  onClose: () => void
}
const IssueFormDialog: FC<Props> = ({ open, onClose }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleClose = useCallback((): void => {
    setTitle('')
    setBody('')

    onClose()
  }, [])

  const { mutate, error } = trpc.issues.create.useMutation({
    onSuccess: handleClose
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()

      console.log({ title, body })
      mutate({ title, body })
    },
    [title, body]
  )

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Report Issue</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            {error && <Alert severity="error">{error.message}</Alert>}
            <TextField
              variant="outlined"
              placeholder="Title"
              label="Title"
              required
              value={title}
              onChange={(e): void => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              placeholder="Leave a comment"
              label="Comment"
              multiline
              rows={4}
              value={body}
              onChange={(e): void => setBody(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Submit Issue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default IssueFormDialog
