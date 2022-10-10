import { useNavigate } from 'react-router-dom';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { QuestionCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const navigate = useNavigate();

  const handleListItemClick = (href) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={() => handleListItemClick('/user')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="account" />} />
      </ListItemButton>
      <ListItemButton onClick={() => handleListItemClick('/user/settings')}>
        <ListItemIcon>
          <SettingOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="settings" />} />
      </ListItemButton>
      <ListItemButton onClick={() => handleListItemClick()}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="support" />} />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
