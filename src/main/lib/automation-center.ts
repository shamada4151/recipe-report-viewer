import child from 'child_process'
import fs from 'fs'
import path from 'path'

import { getAutomationCenterSettings } from '@main/common/ac-config'

const AC_PATH = 'C:\\Program Files\\JEOL\\AutomationCenter\\bin\\Release\\AutomationCenter.exe'
const DEFAULT_OUTPUT = 'C:\\Users\\hamada\\AppData\\Local\\JEOL\\AutomationCenter\\Results'
const REPORT_DIR_ROOT = path.join('Report', 'Local')

export const openAutomationCenter = (recipe?: string | null): void => {
  const cmd = `start "" "${AC_PATH}" "${recipe || ''}"`

  child.exec(cmd, (err, data) => {
    if (err) {
      console.error(err)
    }

    console.log(data.toString())
  })
}

/**
 * Report が設定通りに保存されている場合、元のレシピファイルを推測する
 * @param report Report ファイルの保存されているディレクトリパス
 * @returns
 */
export const parseReportRecipe = (report: string): string | null => {
  const settings = getAutomationCenterSettings()
  if (settings === null) {
    return null
  }

  const reportDir = path.join(settings.OutputFolder || DEFAULT_OUTPUT, REPORT_DIR_ROOT)
  // report はタイムスタンプ + プロセスID で管理されるので、その部分を削除
  const relativePath = path.relative(reportDir, report.replace(/\d{17}_\d+.*$/, ''))
  if (relativePath.startsWith('..')) {
    return null
  }

  const filePath = path.join(
    settings.RecipeFolder,
    relativePath,
    `${path.basename(relativePath)}.jac` // デフォルトでは recipe フォルダ名とファイル名は一致する
  )

  if (fs.existsSync(filePath)) {
    return filePath
  } else {
    return null
  }
}

export const openRecipeFromReport = (reportDir: string): void => {
  let recipePath: string | null = ''

  if (reportDir) {
    recipePath = parseReportRecipe(reportDir)
    if (recipePath === null) {
      console.warn('Cannot find original recipe of this report.')
      throw new Error('Cannot find original recipe of this report.')
    }
  }

  openAutomationCenter(recipePath)
}
