import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { usePagePath } from '@renderer/providers/PagePathProvider'
import Typography from '@mui/material/Typography'
import { useTreeItem } from '@renderer/providers/TreeItemProvider'
import { TreeItem } from 'src/types'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import GoToError from './GoToError'

const checkStringPrefix = (str1: string, str2: string): boolean => {
  // split the strings into arrays by '/'
  const arr1 = str1.split('/').filter((item) => item && item !== 'Report.html')
  const arr2 = str2.split('/').filter((item) => item && item !== 'Report.html')

  // check if the strings have same prefix
  const minLength = Math.min(arr1.length, arr2.length)
  for (let i = 0; i < minLength; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

const findParents = (tree: TreeItem, page: string): Array<TreeItem> => {
  const same = checkStringPrefix(tree.href, page)
  if (same) {
    if (tree.href !== page) {
      if (tree.children) {
        for (const child of tree.children) {
          const childResults = findParents(child, page)
          if (childResults.length !== 0) {
            return [tree, ...childResults]
          }
        }
      }
    } else {
      return [tree]
    }
  }

  return []
}

type Crumb = {
  label: string
  href: string
}

const Header: FC = () => {
  const [page, setPage] = usePagePath()
  const tree = useTreeItem()

  const crumbs = useMemo<Array<Crumb>>(() => {
    if (tree) {
      return findParents(tree, page).map((item) => ({
        label: item.report.title,
        href: item.href
      }))
    } else {
      return []
    }
  }, [page, tree])

  return (
    <Box px={1}>
      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs
          sx={{
            ol: {
              overflowX: 'auto',
              flexWrap: 'nowrap'
            },
            li: {
              whiteSpace: 'nowrap'
            }
          }}
        >
          {crumbs.map((item, i) =>
            i === crumbs.length - 1 ? (
              <Typography
                key={`${item}-${i}`}
                color="text.primary"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                component="button"
                underline="hover"
                color="inherit"
                key={`${item}-${i}`}
                onClick={(): void => setPage(item.href)}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {item.label}
              </Link>
            )
          )}
        </Breadcrumbs>
        <GoToError />
      </Stack>
    </Box>
  )
}

export default Header
