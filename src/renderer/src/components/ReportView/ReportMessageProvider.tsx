import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { usePagePath } from '@renderer/providers/PagePathProvider'
import { MESSAGE_TYPE } from '../../../../types'
import type { ReportMessage } from 'src/types'

const CurrentActivityContext = createContext('')

type Props = PropsWithChildren & {
  origin: string
}
export const ReportMessageProvider: FC<Props> = ({ children, origin }) => {
  const [, setPagePath] = usePagePath()
  const [activityId, setActivityId] = useState('')

  useEffect(() => {
    const callback = (event: MessageEvent<ReportMessage>): void => {
      // 信頼できるオリジンからのメッセージかどうかを確認
      if (event.origin !== origin) {
        return
      }

      // react-routerのhistoryを更新
      console.log(event.data.body)
      switch (event.data.type) {
        case MESSAGE_TYPE.PAGE_TRANSITION:
          setPagePath(event.data.body.location.replace(origin, ''))
          break
        case MESSAGE_TYPE.SCROLLED:
          setActivityId(event.data.body.id)
          break

        default:
          console.warn(`Receive not supported event`)
          console.warn(event)
          break
      }
    }
    // メッセージ受信イベントをリッスン
    window.addEventListener('message', callback)

    return () => {
      window.removeEventListener('message', callback)
    }
  }, [origin, setPagePath])

  return (
    <CurrentActivityContext.Provider value={activityId}>{children}</CurrentActivityContext.Provider>
  )
}

export const useCurrentActivity = (): string => {
  return useContext(CurrentActivityContext)
}
