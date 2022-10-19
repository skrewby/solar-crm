// third-party
import { FormattedMessage } from 'react-intl';

// assets
import PersonIcon from '@mui/icons-material/Person';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'user',
      title: <FormattedMessage id="account" />,
      type: 'item',
      url: '/user',
      icon: PersonIcon
    }
  ]
};

export default other;
