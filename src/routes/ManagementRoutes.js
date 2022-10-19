import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - sample page
const OptionsPage = Loadable(lazy(() => import('pages/management/options-management')));
const UsersPage = Loadable(lazy(() => import('pages/management/users-management')));

// ==============================|| MAIN ROUTING ||============================== //

const ManagementRoutes = {
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
          path: 'options',
          element: <OptionsPage />
        },
        {
          path: 'users',
          element: <UsersPage />
        }
      ]
    }
  ]
};

export default ManagementRoutes;
