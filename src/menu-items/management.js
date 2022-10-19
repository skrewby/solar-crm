// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ListAltIcon from '@mui/icons-material/ListAlt';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const management = {
  id: 'management',
  title: <FormattedMessage id="management" />,
  type: 'group',
  children: [
    {
      id: 'options',
      title: <FormattedMessage id="options" />,
      type: 'item',
      url: '/options',
      icon: ListAltIcon
    }
  ]
};

export default management;
