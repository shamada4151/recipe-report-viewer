import { FC, useState } from 'react'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { trpc } from '@renderer/utils/trpc'
import { usePagePath } from '@renderer/providers/PagePathProvider'

function appendOrReplaceWithHash(text: string, originalString: string): string {
  if (!text) {
    return originalString
  }
  // 最後に '#' で始まる文字列があるかを確認します
  const hashIndex = originalString.lastIndexOf('#')

  if (hashIndex !== -1 && hashIndex < originalString.length - 1) {
    // '#' で始まる文字列が存在する場合は、それを新しいテキストで置換します
    return originalString.slice(0, hashIndex) + '#' + text
  } else {
    // '#' で始まる文字列が存在しない場合は、新しいテキストを末尾に追加します
    return originalString + '#' + text
  }
}

const GoToError: FC = () => {
  const [index, setIndex] = useState(-1)
  const [ids, setIds] = useState<Array<string>>([])
  const [path, setPath] = usePagePath()
  trpc.report.activities.useSubscription(undefined, {
    onData(data) {
      setIds(data.activities.map((activity) => activity.id))
    }
  })

  const handleUp = (): void => {
    setIndex((prev) => {
      const next = prev - 1 <= 0 ? 0 : prev - 1
      setPath(appendOrReplaceWithHash(ids[next], path))
      return next
    })
  }

  const handleDown = (): void => {
    setIndex((prev) => {
      const next = prev + 1 >= ids.length ? prev : prev + 1
      setPath(appendOrReplaceWithHash(ids[next] || '', path))
      return next
    })
  }

  return (
    <Stack direction="row">
      <IconButton onClick={handleUp} disabled={index <= 0}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton onClick={handleDown} disabled={index >= ids.length - 1}>
        <ArrowDownwardIcon />
      </IconButton>
    </Stack>
  )
}

export default GoToError
