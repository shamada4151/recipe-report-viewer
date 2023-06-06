import fs from 'fs'
import path from 'path'

import { getApplicationDir } from './nativeEnv'

const getAutomationCenterSettingDir = (): string => {
  return path.join(getApplicationDir(), 'Local', 'JEOL', 'AutomationCenter')
}

export const getLatestReportPath = (): string => {
  return path.join(getAutomationCenterSettingDir(), 'LatestReport')
}

const getSettingFilePath = (): string => {
  return path.join(getAutomationCenterSettingDir(), 'Settings', 'AutomationCenterSettings.json')
}

type AutomationCenterSettings = {
  RecipeFolder: string
  OutputFolder: string | null
}

export const getAutomationCenterSettings = (): AutomationCenterSettings | null => {
  const filePath = getSettingFilePath()
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' })) as AutomationCenterSettings
  } else {
    return null
  }
}
