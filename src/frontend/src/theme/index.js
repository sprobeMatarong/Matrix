import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import typography from './typography';

let theme = createTheme({
  typography,
});

theme = responsiveFontSizes(theme);

export default theme;
