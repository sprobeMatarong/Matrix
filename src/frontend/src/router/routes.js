const routes = [
  // Dont Remove. Handle 404 Pages
  {
    path: '*',
    component: 'pages/public/NotFound',
    auth: false,
  },
  {
    path: '/',
    component: 'pages/public/Home',
    auth: false,
  },
  {
    path: '/dashboard',
    component: 'pages/protected/dashboard/Dashboard',
    auth: true,
  },
  {
    path: '/about',
    component: 'pages/public/About',
    auth: false,
  },
  {
    path: '/signup',
    component: 'pages/public/Signup',
    auth: false,
  },
  {
    path: '/login',
    component: 'pages/public/Login',
    auth: false,
  },
  {
    path: '/forgot-password',
    component: 'pages/public/ForgotPassword',
    auth: false,
  },
  {
    path: '/password/reset',
    component: 'pages/public/ResetPassword',
    auth: false,
  },
  {
    path: '/activate',
    component: 'pages/public/Activate',
    auth: false,
  },
  {
    path: '/profile',
    component: 'pages/protected/Profile',
    auth: true,
  },
  {
    path: '/terms',
    component: 'pages/public/Terms',
    auth: false,
  },
  {
    path: '/users',
    component: 'pages/protected/users/Users',
    auth: true,
  },
  {
    path: '/integrations',
    component: 'pages/protected/Integrations',
    auth: true,
  },
  {
    path: '/faq',
    component: 'pages/public/Faq',
    auth: false,
  },
  {
    path: '/inquiry',
    component: 'pages/public/Inquiry',
    auth: false,
  },
];

export default routes;
