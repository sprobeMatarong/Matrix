import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import Loader from '../components/atoms/Loader';

function Router() {
  const DashboardLayout = lazy(() => import('../templates/Authenticated'));
  const GuestTemplate = lazy(() => import('../templates/Guest'));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, i) => {
          const Page = lazy(() => import(`../${route.component}`));
          const layout = route.auth ? <DashboardLayout /> : <GuestTemplate navbar={route.navbar} />;

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
