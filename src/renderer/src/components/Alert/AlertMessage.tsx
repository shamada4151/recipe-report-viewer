import Alert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { FC, useCallback } from 'react'

export type AlertMessageProps = {
  open: boolean
  message: string
  severity?: AlertProps['severity']
  onClose: () => void
}
const AlertMessage: FC<AlertMessageProps> = ({ open, message, severity = 'info', onClose }) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Snackbar
      open={open}
      key={message}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity={severity}
        sx={{
          color: (theme) => theme.palette[severity].contrastText
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage
