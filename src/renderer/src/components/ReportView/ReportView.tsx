import { FC, useEffect } from 'react'
import Box from '@mui/material/Box'

import { usePagePath } from '@renderer/providers/PagePathProvider'
import Header from './Header'
import Stack from '@mui/material/Stack'

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
      console.log(event)
      // if (typeof event.data === 'string') {
      //   setPath(event.data.replace(`${root}`, ''))
      // }
    }
    // メッセージ受信イベントをリッスン
    window.addEventListener('message', callback)

    return () => {
      window.removeEventListener('message', callback)
    }
  }, [setPath])

  return (
    <Box width="100%" height="100%" display="block" boxSizing="border-box">
      <Stack height="100%">
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <iframe src={new URL(path, root).href} width="100%" height="100%" />
        </Box>
      </Stack>
    </Box>
  )
}

export default ReportView
