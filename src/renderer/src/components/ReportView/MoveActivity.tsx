import { FC, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { trpc } from '@renderer/utils/trpc'
import { usePagePath } from '@renderer/providers/PagePathProvider'
import { useCurrentActivity } from './ReportMessageProvider'

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

const MoveActivity: FC = () => {
  const [index, setIndex] = useState(0)
  const [ids, setIds] = useState<Array<string>>([])
  const [page, setPage] = usePagePath()
  const currentId = useCurrentActivity()
  trpc.report.activities.useSubscription(undefined, {
    onData(data) {
      setIds(data.activities.map((activity) => activity.id))
    }
  })

  const handleUp = (): void => {
    setIndex((prev) => {
      const next = prev - 1 <= 0 ? 0 : prev - 1
      setPage(appendOrReplaceWithHash(ids[next], page))
      return next
    })
  }

  const handleDown = (): void => {
    setIndex((prev) => {
      const next = prev + 1 >= ids.length ? prev : prev + 1
      setPage(appendOrReplaceWithHash(ids[next] || '', page))
      return next
    })
  }

  useEffect(() => {
    if (page.lastIndexOf('#') === -1) {
      setIndex(0)
    }
  }, [page])

  useEffect(() => {
    const index = ids.indexOf(currentId)
    if (index !== -1) {
      setIndex(index)
    }
  }, [currentId])

  return (
    <Stack direction="row">
      <IconButton size="small" onClick={handleUp} disabled={index <= 0}>
        <ArrowUpwardIcon fontSize="inherit" />
      </IconButton>
      <IconButton size="small" onClick={handleDown} disabled={index >= ids.length - 1}>
        <ArrowDownwardIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  )
}

export default MoveActivity
