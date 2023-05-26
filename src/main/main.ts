import { app } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'

import { appRouter } from './api/router'
import { init } from './browser/init'

app.on('ready', () => {
  const win = init()

  createIPCHandler({ router: appRouter, windows: [win] })

  win.show()
})

app.once('window-all-closed', () => app.quit())
