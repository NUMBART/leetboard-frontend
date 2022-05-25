import './App.css';
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@mui/material';
import Loader from './components/Loader';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#757575',
    },
    secondary: {
      main: '#fafafa',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Loader />
    </ThemeProvider>
  );
}

export default App;
