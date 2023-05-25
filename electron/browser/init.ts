import path from 'path'
import { BrowserWindow, Menu } from 'electron'
import isDev from 'electron-is-dev'

import { menu } from './menu'

// build 後に参照する想定なので current directory で問題なし
const preload = path.join(__dirname, './preload.js')
const url = process.env['VITE_DEV_SERVER_URL']

export const init = () => {
  const win = new BrowserWindow({
    // disable initial window from showing
    show: isDev ? false : true,
    width: 800,
    height: 600,
    webPreferences: {
      preload,
    },
  })
  Menu.setApplicationMenu(menu)

  if (isDev && url) {
    win.loadURL(url)
  } else {
    win.loadFile(path.join(__dirname, '../dist', 'index.html'))
  }

  return win
}
