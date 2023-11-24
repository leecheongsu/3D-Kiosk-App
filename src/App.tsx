import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import { initializeI18next } from './plugins/i18next';
import { Provider } from 'react-redux';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from "@styles/theme";
import store from './store';

function App() {
  useEffect(() => {
    initializeI18next();
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const setCustomVh = () => {
      document.documentElement.style.setProperty('--vh', window.innerHeight / 100 + 'px');
    };
    window.addEventListener('resize', setCustomVh);
    return () => {
      window.removeEventListener('resize', setCustomVh);
    };
  }, []);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <AppRouter />
            </ThemeProvider>
          </StyledEngineProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
