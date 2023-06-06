import { Menu, dialog } from 'electron'
import { openRecipeFromReport } from './automation-center'
import { MenuItemConstructorOptions } from 'electron'

export const buildContextMenu = (reportDir: string | undefined): Menu => {
  const openAC: MenuItemConstructorOptions = {
    id: 'open-ac',
    label: 'Open in AutomationCenter',
    click: (_, browser) => {
      if (reportDir) {
        try {
          openRecipeFromReport(reportDir)
        } catch (e) {
          if (e instanceof Error && browser) {
            dialog.showMessageBox(browser, {
              title: 'Fail to open recipe',
              message: e.message,
              type: 'error'
            })
          }
        }
      }
    },
    enabled: reportDir ? true : false
  }

  return Menu.buildFromTemplate([openAC])
}
