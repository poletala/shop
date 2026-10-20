import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7FCE00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4a4a4a',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b6b6b',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontSize: 'clamp(2rem, 7vw, 3.75rem)',
    },
    h3: {
      fontSize: 'clamp(1.75rem, 6vw, 3rem)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})
