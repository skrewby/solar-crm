import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - sample page
const CustomersPage = Loadable(lazy(() => import('pages/customers/customers')));
const CustomerPage = Loadable(lazy(() => import('pages/customers/customer')));

// ==============================|| MAIN ROUTING ||============================== //

const CustomersRoutes = {
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
          path: 'customers',
          children: [
            {
              path: '',
              element: <CustomersPage />
            },
            {
              path: ':id',
              element: <CustomerPage />
            }
          ]
        }
      ]
    }
  ]
};

export default CustomersRoutes;
