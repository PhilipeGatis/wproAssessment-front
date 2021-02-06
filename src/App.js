import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { RecoilRoot as GlobalState } from 'recoil'
import Routes from './Routes'
import Notification from './organinsms/Notification'

import theme from './theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalState>
      <Notification />
      <Routes />
    </GlobalState>
  </ThemeProvider>
)

export default App
