import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - sample page
const ServicesPage = Loadable(lazy(() => import('pages/services/services')));
const ServicePage = Loadable(lazy(() => import('pages/services/service')));

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
              element: <ServicePage />
            }
          ]
        }
      ]
    }
  ]
};

export default ServicesRoutes;
