import { createTheme, Theme } from '@mui/material/styles';
import '@mui/styles';
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  interface Theme {}
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#834DF0',
    },
    secondary: {
      main: '#1e1e1e',
    },
  },
});
