import path from 'path'
import { app, BrowserWindow } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'
import { appRouter } from './api/router'

const preload = path.join(__dirname, './preload.js')
const url = process.env['VITE_DEV_SERVER_URL']

app.on('ready', () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  createIPCHandler({ router: appRouter, windows: [win] })

  if (url) {
    win.loadURL(url)
  } else {
    win.loadFile(path.join(__dirname, '../dist', 'index.html'))
  }

  win.show()
})
