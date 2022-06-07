import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../../components/LanguageSelect';

function Navbar() {
  const { t } = useTranslation();
  const menus = [
    { label: t('menu.about'), url: '/about' },
    { label: t('menu.inquiry'), url: '/inquiry' },
    { label: t('menu.faq'), url: '/faq' },
  ];
  const appName = process.env.REACT_APP_SITE_TITLE;

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img src="/static/images/sprobe-icon.png" alt={appName} height={48} />
            </Link>
          </Box>

          <nav>
            {menus.map((menu) => {
              return (
                <Button
                  component={Link}
                  variant="button"
                  underline="none"
                  color="text.primary"
                  to={menu.url}
                  sx={{ my: 1 }}
                  key={menu.label}
                >
                  {menu.label}
                </Button>
              );
            })}
          </nav>

          <Button component={Link} to="/signup" variant="outlined" sx={{ my: 1, mx: 1 }}>
            {t('labels.signup')}
          </Button>

          <Button component={Link} to="/login" variant="contained" disableElevation sx={{ my: 1 }}>
            {t('labels.login')}
          </Button>

          <LanguageSelect />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
