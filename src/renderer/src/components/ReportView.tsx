import { FC, useEffect } from 'react'
import Box from '@mui/material/Box'

import { usePagePath } from '@renderer/providers/PagePathProvider'

type Props = {
  root: string
}
const ReportView: FC<Props> = ({ root }) => {
  const [path, setPath] = usePagePath()

  useEffect(() => {
    const callback = (event: MessageEvent): void => {
      // 信頼できるオリジンからのメッセージかどうかを確認
      if (event.origin !== root) {
        return
      }

      // react-routerのhistoryを更新
      if (typeof event.data === 'string') {
        setPath(event.data.replace(`${root}`, ''))
      }
    }
    // メッセージ受信イベントをリッスン
    window.addEventListener('message', callback)

    return () => {
      window.removeEventListener('message', callback)
    }
  }, [setPath])

  return (
    <Box width="100%" height="100%" display="block" boxSizing="border-box">
      <iframe src={new URL(path, root).href} height="100%" width="100%" />
    </Box>
  )
}

export default ReportView
