const routes = [
  // Dont Remove. Handle 404 Pages
  {
    path: '*',
    component: 'pages/NotFound',
    auth: false,
  },
  {
    path: '/',
    component: 'pages/Home',
    auth: true,
  },
  {
    path: '/about',
    component: 'pages/About',
    auth: false,
  },
  {
    path: '/signup',
    component: 'pages/Signup',
    auth: false,
  },
  {
    path: '/login',
    component: 'pages/Login',
    auth: false,
  },
  {
    path: '/forgot-password',
    component: 'pages/ForgotPassword',
    auth: false,
  },
  {
    path: '/password/reset',
    component: 'pages/ResetPassword',
    auth: false,
  },
  {
    path: '/activate',
    component: 'pages/Activate',
    auth: false,
  },
  {
    path: '/profile',
    component: 'pages/Profile',
    auth: true,
  },
  {
    path: '/terms',
    component: 'pages/Terms',
    auth: false,
  },
];

export default routes;
