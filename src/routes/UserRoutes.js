import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render
const UserProfile = Loadable(lazy(() => import('pages/user/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/user/TabPersonal')));
const UserTabPassword = Loadable(lazy(() => import('sections/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/user/TabSettings')));

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
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
          path: 'user',
          element: <UserProfile />,
          children: [
            {
              path: '',
              element: <UserTabPersonal />
            },
            {
              path: 'password',
              element: <UserTabPassword />
            },
            {
              path: 'settings',
              element: <UserTabSettings />
            }
          ]
        }
      ]
    }
  ]
};

export default UserRoutes;
