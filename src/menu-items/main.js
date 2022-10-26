// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';

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
      icon: HeadsetMicOutlinedIcon
    },
    {
      id: 'services',
      title: <FormattedMessage id="services" />,
      type: 'item',
      url: '/services',
      icon: BuildOutlinedIcon
    },
    {
      id: 'stock',
      title: <FormattedMessage id="stock" />,
      type: 'item',
      url: '/stock',
      icon: WarehouseOutlinedIcon
    },
    {
      id: 'customers',
      title: <FormattedMessage id="customers" />,
      type: 'item',
      url: '/customers',
      icon: AssignmentIndOutlinedIcon
    }
  ]
};

export default main;
