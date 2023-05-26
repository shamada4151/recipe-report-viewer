import path from 'path'

import { BrowserWindow, dialog } from 'electron'

export const getDirBySelectingFile = async (parent: BrowserWindow): Promise<string> => {
  const results = await dialog.showOpenDialog(parent, {
    properties: ['openFile'], // Windows では directory と file 両方を指定できない
    filters: [
      {
        name: 'html',
        extensions: ['html']
      }
    ]
  })
  if (results.canceled || results.filePaths.length === 0) {
    return ''
  }

  return path.dirname(results.filePaths[0])
}
