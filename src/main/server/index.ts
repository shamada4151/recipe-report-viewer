import { Server } from 'http'
import * as net from 'net'

import express from 'express'
import { ReportParserMiddleware } from './middleware/report-parser'

export const launch = async (root: string): Promise<Server> => {
  const app = express()

  app.use(ReportParserMiddleware(root))
  app.use(express.static(root))

  const port = await findFreePortFaster(3000, 100, 1000)

  const server = app.listen(port, function () {
    console.log(`Listening on port ${port}!`)
  })

  return server
}

/**
 * Uses listen instead of connect. Is faster, but if there is another listener on 0.0.0.0 then this will take 127.0.0.1 from that listener.
 */
export function findFreePortFaster(
  startPort: number,
  giveUpAfter: number,
  timeout: number
): Promise<number> {
  let resolved = false
  let timeoutHandle: NodeJS.Timeout | undefined = undefined
  let countTried = 1
  const server = net.createServer({ pauseOnConnect: true })

  function doResolve(port: number, resolve: (port: number) => void): void {
    if (!resolved) {
      resolved = true
      server.removeAllListeners()
      server.close()
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
      resolve(port)
    }
  }

  return new Promise<number>((resolve) => {
    timeoutHandle = setTimeout(() => {
      doResolve(0, resolve)
    }, timeout)

    server.on('error', (err) => {
      if (
        err &&
        'code' in err &&
        (err.code === 'EADDRINUSE' || err.code === 'EACCES') &&
        countTried < giveUpAfter
      ) {
        startPort++
        countTried++
        server.listen(startPort)
      } else {
        doResolve(0, resolve)
      }
    })
    server.on('listening', () => {
      doResolve(startPort, resolve)
    })
    server.on('close', () => {
      doResolve(0, resolve)
    })

    server.listen(startPort)
  })
}
