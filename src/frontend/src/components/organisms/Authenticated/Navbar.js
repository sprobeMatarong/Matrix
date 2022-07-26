import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography, styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import LanguageSelect from 'components/atoms/LanguageSelect';
import { links } from 'components/molecules/SidebarMenu';
import stringToColor from 'utils/stringToColor';

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

function Navbar(props) {
  const { open, onToggle, onLogout, user } = props;
  const location = useLocation();
  const [title, setTitle] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const link = links.find((link) => link.path === location.pathname);
    if (link) setTitle(link.label);
  }, [location]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const getAvatarProps = (user) => {
    // set initial props
    const props = {
      onClick: handleClick,
      sx: {
        marginLeft: '16px',
        cursor: 'pointer',
      },
    };

    return user.avatar
      ? {
          ...props,
          ...{
            alt: user.full_name,
            src: user.avatar,
          },
        }
      : {
          ...props,
          ...{
            sx: {
              bgcolor: stringToColor(user.full_name),
              marginLeft: '16px',
              cursor: 'pointer',
            },
            children: `${user.full_name.split(' ')[0][0]}${user.full_name.split(' ')[1][0]}`,
          },
        };
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

        <Avatar {...getAvatarProps(user)} />

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

Navbar.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  onLogout: PropTypes.func,
  user: PropTypes.object,
};

export default Navbar;
