import os from 'os'
import path from 'path'

const getUserDataPath = (): string => {
  switch (process.platform) {
    case 'win32':
      return process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming')
    default:
      return path.join(os.homedir(), '.config')
  }
}

const getAppSettingPath = (): string => {
  return path.join(getUserDataPath(), 'JEOL', 'ACReportViewer')
}

const getUserSettingPath = (): string => {
  return path.join(getAppSettingPath(), 'User')
}

export const getReportStoragePath = (): string => {
  return path.join(getUserSettingPath(), 'reportStorage')
}
