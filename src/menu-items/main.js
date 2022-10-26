// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const main = {
  id: 'main',
  title: <FormattedMessage id="main" />,
  type: 'group',
  children: [
    {
      id: 'leads',
      title: <FormattedMessage id="leads" />,
      type: 'item',
      url: '/leads',
      icon: HeadsetMicIcon
    },
    {
      id: 'stock',
      title: <FormattedMessage id="stock" />,
      type: 'item',
      url: '/stock',
      icon: WarehouseIcon
    },
    {
      id: 'customers',
      title: <FormattedMessage id="customers" />,
      type: 'item',
      url: '/customers',
      icon: AssignmentIndIcon
    }
  ]
};

export default main;
