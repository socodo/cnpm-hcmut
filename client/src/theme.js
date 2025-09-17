import { createTheme } from '@mui/material/styles'
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252'
        },
        secondary: {
          main: '#1976d2'
        },
        background: {
          default: '#ffffff',
          paper: '#f5f5f5'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#ff5252'
        },
        secondary: {
          main: '#90caf9'
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e'
        }
      }
    }
  }
})

export default theme
