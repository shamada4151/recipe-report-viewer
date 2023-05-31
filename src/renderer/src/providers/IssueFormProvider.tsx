import { FC, PropsWithChildren, useState } from 'react'

import IssueFormDialog from '@renderer/components/IssueFormDialog'
import { trpc } from '@renderer/utils/trpc'

export const IssueFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)

  trpc.issues.open.useSubscription(undefined, {
    onData: () => {
      setOpen(true)
    }
  })

  return (
    <>
      {children}
      {open && <IssueFormDialog open={open} onClose={(): void => setOpen(false)} />}
    </>
  )
}
