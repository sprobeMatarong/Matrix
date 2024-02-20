const admin = [
  {
    path: '/admin',
    component: 'pages/authenticated/admin/Dashboard',
    auth: true,
  },
  {
    path: '/admin/users',
    component: 'pages/authenticated/admin/Users',
    auth: true,
  },
  {
    path: '/admin/roles',
    component: 'pages/authenticated/admin/Roles',
    auth: true,
  },
  {
    path: '/admin/integrations',
    component: 'pages/authenticated/admin/Integrations',
    auth: true,
  },
];

export default admin;
