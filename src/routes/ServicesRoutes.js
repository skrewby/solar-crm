import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - sample page
const ServicesPage = Loadable(lazy(() => import('pages/services/services')));

// ==============================|| MAIN ROUTING ||============================== //

const ServicesRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'services',
          children: [
            {
              path: '',
              element: <ServicesPage />
            },
            {
              path: ':id',
              element: <ServicesPage />
            }
          ]
        }
      ]
    }
  ]
};

export default ServicesRoutes;
