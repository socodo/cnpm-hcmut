import { useColorScheme } from '@mui/material/styles'
import { Box, Typography, IconButton } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'

function ThemeToggle() {
  const { mode, setMode } = useColorScheme()

  return (
    <IconButton
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark'
        }
      }}
    >
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  )
}

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        color: 'text.primary',
        gap: 4
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          textAlign: 'center'
        }}
      >
        Welcome Tutor Support System
      </Typography>
      <ThemeToggle />
    </Box>
  )
}

export default App
