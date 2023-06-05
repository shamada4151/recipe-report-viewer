import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from 'react'
import AlertMessage, { AlertMessageProps } from './AlertMessage'

type AlertMessageContextProps = Pick<AlertMessageProps, 'message' | 'severity'>
type SetAlertMessage = (args: AlertMessageContextProps) => void
export const SetAlertMessageContext = createContext<SetAlertMessage>(() => {
  throw Error('AlertMessageProvider is not wrapped')
})

export const AlertMessageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<AlertMessageContextProps | null>(null)

  const handleSetAlertMessage = useCallback((args: AlertMessageContextProps) => {
    setAlertMessage(args)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setAlertMessage(null)
    setOpen(false)
  }, [])

  return (
    <>
      <SetAlertMessageContext.Provider value={handleSetAlertMessage}>
        {children}
      </SetAlertMessageContext.Provider>
      {alertMessage && <AlertMessage open={open} onClose={handleClose} {...alertMessage} />}
    </>
  )
}

export const useAlertMessage = (): SetAlertMessage => {
  const setAlertMessage = useContext(SetAlertMessageContext)

  return setAlertMessage
}
