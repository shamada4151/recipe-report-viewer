export type ReportInfo = {
  title: string
  error?: boolean
}

export type TreeItem = {
  report: ReportInfo
  href: string
  children?: Array<TreeItem>
}

export type { AppRouter } from './trpc'
