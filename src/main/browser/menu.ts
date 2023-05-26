import { Menu, MenuItemConstructorOptions } from 'electron'
import { init } from './init'

// メニューのテンプレート配列を作成
const template: MenuItemConstructorOptions[] = [
  {
    role: 'fileMenu',
    submenu: [
      {
        label: 'New Window',
        accelerator: 'Ctrl+Shift+N',
        click: (): void => {
          init().show()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'close'
      }
    ]
  },
  { role: 'viewMenu' },
  { role: 'help', submenu: [{ role: 'about' }] }
]

// macOS では "アプリメニュー" が必要
if (process.platform === 'darwin') template.unshift({ role: 'appMenu' })

// テンプレートからメニューを作成
export const menu = Menu.buildFromTemplate(template)
