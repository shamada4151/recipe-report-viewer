import path from 'path'
import { getApplicationDir } from './nativeEnv'

const getAutomationCenterSettingDir = (): string => {
  return path.join(getApplicationDir(), 'Local', 'JEOL', 'AutomationCenter')
}

export const getLatestReportPath = (): string => {
  return path.join(getAutomationCenterSettingDir(), 'LatestReport')
}
