import { app, BrowserWindow, dialog } from 'electron'
import { launch } from './server'
import { AddressInfo } from 'net'

export const openReport = async () => {
  const window = BrowserWindow.getFocusedWindow()

  if (window === null) {
    return
  }
  const dirName = await dialog.showOpenDialog(window, {
    properties: ['openDirectory'],
  })
  if (dirName.canceled) {
    return
  }

  const server = await launch(dirName.filePaths[0])
  app.on('quit', () => {
    server.close()
  })
  app.on('quit', () => {
    console.log('quitted')
  })
  return (server.address() as AddressInfo).port
}
