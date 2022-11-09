// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

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
      icon: PeopleOutlineOutlinedIcon
    }
  ]
};

export default management;
