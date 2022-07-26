import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from 'components/atoms/Loader';
import routes from './routes';

function Router() {
  const DashboardLayout = lazy(() => import('templates/Authenticated'));
  const GuestTemplate = lazy(() => import('templates/Guest'));

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
