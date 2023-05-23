import path from 'path'
import { app, BrowserWindow } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'
import isDev from 'electron-is-dev'

import { appRouter } from './api/router'

const preload = path.join(__dirname, './preload.js')
const url = process.env['VITE_DEV_SERVER_URL']

app.on('ready', () => {
  const win = new BrowserWindow({
    // disable initial window from showing
    show: isDev ? false : true,
    width: 800,
    height: 600,
    webPreferences: {
      preload,
    },
  })

  createIPCHandler({ router: appRouter, windows: [win] })

  if (isDev && url) {
    win.loadURL(url)
  } else {
    win.loadFile(path.join(__dirname, '../dist', 'index.html'))
  }

  win.showInactive()
})
