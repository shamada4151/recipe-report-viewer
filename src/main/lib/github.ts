import fetch from 'node-fetch'
import { ProxyAgent } from 'proxy-agent'

type IssueBody = {
  title: string
  body?: string
}
/**
 * GitHub API を使って Issue を作成する
 * GitHub の sdk が使えなかったので、直接 call している
 * @param body
 */
export const createIssues = async (body: IssueBody): Promise<void> => {
  await fetch(import.meta.env.MAIN_VITE_GITHUB_ISSUES_URL, {
    method: 'POST',
    body: JSON.stringify({ ...body, labels: ['report'] }),
    agent: new ProxyAgent(),
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${import.meta.env.MAIN_VITE_GITHUB_PAT}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}
