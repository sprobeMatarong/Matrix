import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from 'components/atoms/Button';
import LanguageSelect from 'components/atoms/LanguageSelect';
import MenuLinks from 'components/atoms/MenuLinks';

function GuestNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorMobileNav, setAnchorMobileNav] = useState(null);

  const menus = [
    { label: t('menu.about'), url: '/about' },
    { label: t('menu.inquiry'), url: '/inquiry' },
    { label: t('menu.faq'), url: '/faq' },
    { label: t('menu.styleguide'), url: '/styleguide' },
  ];

  const appName = process.env.REACT_APP_SITE_TITLE;

  const handleOpenNavMenu = (event) => setAnchorMobileNav(event.currentTarget);
  const handleCloseNavMenu = (url) => {
    setAnchorMobileNav(null);
    navigate(url, { replace: true });
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ flexWrap: 'wrap' }} disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <img src="/static/images/sprobe-icon.png" alt={appName} height={48} />
            </Link>
          </Box>

          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuLinks items={menus} />
          </Box>

          <Button
            component={Link}
            to="/signup"
            variant="outlined"
            color="transparent"
            sx={{ my: 1, mx: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {t('labels.signup')}
          </Button>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            disableElevation
            sx={{ my: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {t('labels.login')}
          </Button>

          {/** Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="main menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Box
              onClick={() => navigate('/')}
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              <img src="/static/images/sprobe-icon.png" alt={appName} height={48} />
            </Box>

            <Menu
              id="menu-appbar"
              anchorEl={anchorMobileNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorMobileNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              MenuListProps={{
                style: {
                  width: 200,
                },
              }}
            >
              {menus.map((menu, key) => (
                <MenuItem key={key} onClick={() => handleCloseNavMenu(menu.url)}>
                  <Typography textAlign="center">{menu.label}</Typography>
                </MenuItem>
              ))}

              <MenuItem onClick={() => handleCloseNavMenu('/signup')}>
                <Typography textAlign="center">{t('labels.signup')}</Typography>
              </MenuItem>

              <MenuItem onClick={() => handleCloseNavMenu('/login')}>
                <Typography textAlign="center">{t('labels.login')}</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <LanguageSelect sx={{ ml: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default GuestNavbar;
