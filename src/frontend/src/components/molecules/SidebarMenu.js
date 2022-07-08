import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const links = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Users',
    path: '/users',
    icon: <PeopleIcon />,
  },
  {
    label: 'Integrations',
    path: '/integrations',
    icon: <LayersIcon />,
  },
];

function SidebarMenu() {
  const location = useLocation();
  const { t } = useTranslation();
  const localizeLinks = [...links];

  // add localization to menu items
  localizeLinks.map((link) => {
    link.label = t(`menu.${link.path.replace('/', '')}`);
    return link;
  });

  return (
    <>
      {localizeLinks.map((item, key) => {
        return (
          <ListItemButton
            key={key}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={<Typography variant="body2">{item.label}</Typography>} />
          </ListItemButton>
        );
      })}
    </>
  );
}

export { links, SidebarMenu };
