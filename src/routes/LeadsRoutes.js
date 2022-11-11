import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render
const Leads = Loadable(lazy(() => import('pages/leads/leads')));
const LeadPage = Loadable(lazy(() => import('pages/leads/lead')));

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
          children: [
            {
              path: '',
              element: <Leads />
            },
            {
              path: ':id',
              element: <LeadPage />
            }
          ]
        }
      ]
    }
  ]
};

export default LeadsRoutes;
