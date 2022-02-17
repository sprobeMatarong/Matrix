import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Logo from '../../logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../../components/LanguageSelect';

function Navbar() {
  const { t } = useTranslation();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={Logo} alt="Companyy Name" height={48} />
          </Link>
        </Box>

        <nav>
          <Button
            component={Link}
            variant="button"
            underline="none"
            color="text.primary"
            to="/about"
            sx={{ my: 1 }}
          >
            About
          </Button>
          <Button
            component={Link}
            variant="button"
            underline="none"
            color="text.primary"
            to="/contact"
            sx={{ my: 1 }}
          >
            Contact
          </Button>
          <Button
            component={Link}
            variant="button"
            underline="none"
            color="text.primary"
            to="/faq"
            sx={{ my: 1 }}
          >
            FAQ
          </Button>
        </nav>
        <Button component={Link} to="/signup" variant="outlined" sx={{ my: 1, mx: 1 }}>
          {t('labels.signup')}
        </Button>
        <Button component={Link} to="/login" variant="contained" disableElevation sx={{ my: 1 }}>
          {t('labels.login')}
        </Button>

        <LanguageSelect />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
