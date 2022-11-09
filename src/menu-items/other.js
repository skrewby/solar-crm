// third-party
import { FormattedMessage } from 'react-intl';

// assets
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

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
      icon: PersonOutlineOutlinedIcon
    }
  ]
};

export default other;
