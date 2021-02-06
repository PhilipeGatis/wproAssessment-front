import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ec5b27',
    },
    secondary: {
      main: '#384a93',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f4f4f4',
    },
  },
})

export default theme
