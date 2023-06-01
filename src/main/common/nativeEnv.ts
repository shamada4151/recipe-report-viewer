import os from 'os'
import path from 'path'

export const getApplicationDir = (): string => {
  switch (process.platform) {
    case 'win32':
      return path.join(os.homedir(), 'AppData')
    default:
      return os.homedir()
  }
}

const getUserDataPath = (): string => {
  switch (process.platform) {
    case 'win32':
      return path.join(getApplicationDir(), 'Roaming')
    default:
      return path.join(getApplicationDir(), '.config')
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
