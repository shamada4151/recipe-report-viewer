import * as crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import { getReportStoragePath } from '../common/nativeEnv'

const FILE_NAME = 'report.json'
type ReportStorage = {
  folder: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isReportStorage = (obj: any): obj is ReportStorage => {
  return obj !== null && typeof obj === 'object' && typeof obj.folder === 'string'
}

export const setOpened = (openedPath: string): void => {
  const dirName = path.join(
    getReportStoragePath(),
    crypto.createHash('md5').update(openedPath).digest('hex')
  )

  if (fs.existsSync(dirName) === false) {
    fs.mkdirSync(dirName, {
      recursive: true
    })

    const data: ReportStorage = {
      folder: openedPath
    }
    fs.writeFile(path.join(dirName, FILE_NAME), JSON.stringify(data), (err) => {
      if (err) {
        console.error(err)
        throw err
      }
    })
  } else {
    // directory に touch して更新日時を最新にする
    const time = new Date()
    fs.utimes(dirName, time, time, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
}

export const readReportStorage = (filePath: string): ReportStorage | null => {
  if (fs.existsSync(filePath) === false) {
    return null
  }

  const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
  if (isReportStorage(data)) {
    return data
  } else {
    return null
  }
}

type TempDir = {
  file: string
  mtime: Date
  isDir: boolean
}
export const getRecentlyOpened = (limit = 5): Promise<Array<string>> => {
  const storage = getReportStoragePath()

  return new Promise<Array<string>>((resolve) =>
    fs.readdir(storage, async (err, files) => {
      if (err) {
        console.error(err)
        resolve([])
        return
      }

      const results = (
        await Promise.all(
          files.map(
            (file) =>
              new Promise<TempDir>((resolve) => {
                fs.stat(path.join(storage, file), (err, stats) => {
                  if (err) {
                    resolve({
                      file,
                      mtime: new Date(),
                      isDir: false
                    })
                  }
                  resolve({
                    file,
                    mtime: stats.mtime,
                    isDir: stats.isDirectory()
                  })
                })
              })
          )
        )
      )
        .filter(({ isDir }) => isDir)
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
        .slice(0, limit)
        .map(({ file }) => path.join(storage, file, FILE_NAME))

      resolve(results)
    })
  )
}
