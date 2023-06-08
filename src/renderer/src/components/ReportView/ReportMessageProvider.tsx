import { FC, PropsWithChildren, useEffect } from 'react'
import { usePagePath } from '@renderer/providers/PagePathProvider'
import { MESSAGE_TYPE } from '../../../../types'
import type { ReportMessage } from 'src/types'

type Props = PropsWithChildren & {
  origin: string
}
export const ReportMessageProvider: FC<Props> = ({ children, origin }) => {
  const [, setPagePath] = usePagePath()

  useEffect(() => {
    const callback = (event: MessageEvent<ReportMessage>): void => {
      // 信頼できるオリジンからのメッセージかどうかを確認
      if (event.origin !== origin) {
        return
      }

      // react-routerのhistoryを更新
      console.log(event)
      switch (event.data.type) {
        case MESSAGE_TYPE.PAGE_TRANSITION:
          setPagePath(event.data.body.location.replace(origin, ''))
          break
        case MESSAGE_TYPE.SCROLLED:
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

  return <>{children}</>
}
