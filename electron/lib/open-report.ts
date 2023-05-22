import { app } from 'electron'

import { launch } from './server'

export const launchServer = async (root: string) => {
  const server = await launch(root)

  app.on('quit', () => {
    server.close()
  })
  app.on('window-all-closed', () => {
    server.close()
  })

  return server
}
