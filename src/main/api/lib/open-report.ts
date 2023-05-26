import fs from 'fs'
import path from 'path'

import { app } from 'electron'

import { launch } from './server'
import { LATEST_REPORT } from '../common/ac-config'

export const launchServer = async (root: string) => {
  const server = await launch(root)
  app.on('quit', () => {
    server.close()
  })
  return server
}

export const getLatestReportDir = () => {
  const reportFile = fs.readFileSync(LATEST_REPORT, { encoding: 'utf-8' }).trim()
  const reportDir = path.dirname(reportFile)

  return fs.existsSync(reportDir) ? reportDir : null
}
