import { useEffect, useState } from 'react';
import { styled, IconButton, Typography, Badge, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation, Link } from 'react-router-dom';
import { links } from './components/SidebarMenu';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Popover from '@mui/material/Popover';
import LanguageSelect from '../../components/LanguageSelect';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

Navbar.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  onLogout: PropTypes.func,
};

function Navbar({ open, onToggle, onLogout }) {
  const location = useLocation();
  const [title, setTitle] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const link = links.find((link) => link.path === location.pathname);
    if (link) setTitle(link.label);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAccountDropdown = Boolean(anchorEl);
  const id = openAccountDropdown ? 'simple-popover' : undefined;

  return (
    <AppBar position="absolute" open={open} elevation={0}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onToggle}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <LanguageSelect />

        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Avatar
          sx={{ bgcolor: deepOrange[500], marginLeft: '16px', cursor: 'pointer' }}
          aria-describedby={id}
          onClick={handleClick}
        >
          XO
        </Avatar>

        <Popover
          id={id}
          open={openAccountDropdown}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            style: { marginTop: '12px', width: '240px' },
          }}
        >
          <ListItemButton component={Link} to="/profile">
            <ListItemText primary={t('menu.profile')} onClick={handleClose} />
          </ListItemButton>

          <ListItemButton onClick={onLogout}>
            <ListItemText primary={t('menu.logout')} />
          </ListItemButton>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
