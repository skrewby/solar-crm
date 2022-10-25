import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - sample page
const StockPage = Loadable(lazy(() => import('pages/stock/stock')));

// ==============================|| MAIN ROUTING ||============================== //

const StockRoutes = {
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
          path: 'stock',
          element: <StockPage />
        }
      ]
    }
  ]
};

export default StockRoutes;
