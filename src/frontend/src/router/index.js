import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import Loader from '../components/Loader';

function Router() {
  const DashboardLayout = lazy(() => import('../layouts/dashboard/Dashboard'));
  const GuestLayout = lazy(() => import('../layouts/guest/Guest'));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, i) => {
          const Page = lazy(() => import(`../${route.component}`));
          const layout = route.auth ? <DashboardLayout /> : <GuestLayout navbar={route.navbar} />;

          return (
            <Route key={i} element={layout}>
              <Route exact path={route.path} element={<Page />} />
            </Route>
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default Router;
