import { FC, PropsWithChildren } from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const customTheme = createTheme({
  typography: {
    h1: {
      fontSize: '3 rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.75rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '0.8rem',
    },
    fontFamily: ['"Roboto"', '"Noto Sans JP"', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
})

const MUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const cache = createCache({
    key: 'emotion-cache',
    prepend: true,
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MUIProvider
