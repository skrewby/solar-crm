// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BorderOutlined,
  BoxPlotOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SmileOutlined,
  StopOutlined,
  UserOutlined
} from '@ant-design/icons';

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

// icons
const icons = {
  ChromeOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  GatewayOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined,
  UserOutlined,
  ArticleOutlinedIcon
};

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
      icon: icons.ArticleOutlinedIcon
    }
  ]
};

export default main;
