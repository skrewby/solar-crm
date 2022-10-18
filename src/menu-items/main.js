// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

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
    }
  ]
};

export default main;
