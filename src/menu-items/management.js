// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';

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
    },
    {
      id: 'users',
      title: <FormattedMessage id="users" />,
      type: 'item',
      url: '/users',
      icon: PeopleIcon
    }
  ]
};

export default management;
