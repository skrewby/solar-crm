import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render
const Leads = Loadable(lazy(() => import('pages/leads/leads')));

// ==============================|| MAIN ROUTING ||============================== //

const LeadsRoutes = {
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
          path: 'leads',
          element: <Leads />
        }
      ]
    }
  ]
};

export default LeadsRoutes;
