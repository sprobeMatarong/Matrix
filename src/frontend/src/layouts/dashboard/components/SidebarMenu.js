import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const links = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: <ShoppingCartIcon />,
  },
  {
    label: 'Users',
    path: '/users',
    icon: <PeopleIcon />,
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: <BarChartIcon />,
  },
  {
    label: 'Integrations',
    path: '/integrations',
    icon: <LayersIcon />,
  },
];

function SidebarMenu() {
  const location = useLocation();

  return (
    <>
      {links.map((item, key) => {
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
