import { Menu } from 'electron'
import { openRecipeFromReport } from './automation-center'
import { MenuItemConstructorOptions } from 'electron'

export const buildContextMenu = (reportDir: string | undefined): Menu => {
  const openAC: MenuItemConstructorOptions = {
    id: 'open-ac',
    label: 'Open in AutomationCenter',
    click: () => {
      if (reportDir) {
        openRecipeFromReport(reportDir)
      }
    },
    enabled: reportDir ? true : false
  }

  return Menu.buildFromTemplate([openAC])
}
