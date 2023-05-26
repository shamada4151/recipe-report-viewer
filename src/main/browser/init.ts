import path from 'path'
import { BrowserWindow, Menu } from 'electron'
import isDev from 'electron-is-dev'

import { menu } from './menu'

// build 後に参照する想定なので current directory で問題なし
const preload = path.join(__dirname, '../preload/index.js')
const url = process.env['ELECTRON_RENDERER_URL']

export const init = (): BrowserWindow => {
  const win = new BrowserWindow({
    // disable initial window from showing
    width: 900,
    height: 670,
    show: isDev ? false : true,
    webPreferences: {
      preload
    }
  })
  Menu.setApplicationMenu(menu)

  if (isDev && url) {
    win.loadURL(url)
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  return win
}
