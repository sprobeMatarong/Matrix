import { ThemeProvider } from '@mui/material/styles';
import Router from './router';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
