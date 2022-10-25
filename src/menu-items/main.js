// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import WarehouseIcon from '@mui/icons-material/Warehouse';

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
    }
  ]
};

export default main;
