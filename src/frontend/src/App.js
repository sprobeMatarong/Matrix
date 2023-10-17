import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import Router from './router';
import theme from './theme';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
