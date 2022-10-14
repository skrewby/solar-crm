// material-ui
import { List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Switch, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// assets
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { FormattedMessage } from 'react-intl';

// ==============================|| TAB - SETTINGS ||============================== //

const TabSettings = () => {
  const { mode, onChangeMode, presetColor, onChangePresetColor, fontFamily, onChangeFontFamily } = useConfig();

  const handleChangeMode = () => {
    const new_mode = mode === 'light' ? 'dark' : 'light';
    onChangeMode(new_mode);
  };

  const handleChangeTheme = (event) => {
    onChangePresetColor(event.target.value);
  };

  const handleChangeFont = (event) => {
    onChangeFontFamily(event.target.value);
  };

  return (
    <MainCard title="Settings">
      <List sx={{ '& .MuiListItem-root': { p: 2 } }}>
        <ListItem>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <PaletteOutlinedIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText id="switch-list-label-theme" primary={<Typography variant="h5">Theme</Typography>} secondary="App colour scheme" />
          <Select displayEmpty labelId="settings-select-theme" id="setting-select-theme" value={presetColor} onChange={handleChangeTheme}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="theme1">
              <FormattedMessage id="daybreak-blue" />
            </MenuItem>
            <MenuItem value="theme2">
              <FormattedMessage id="golden-purple" />
            </MenuItem>
            <MenuItem value="theme3">
              <FormattedMessage id="polar-green" />
            </MenuItem>
            <MenuItem value="theme4">
              <FormattedMessage id="geek-blue" />
            </MenuItem>
            <MenuItem value="theme5">
              <FormattedMessage id="sunset-orange" />
            </MenuItem>
            <MenuItem value="theme6">
              <FormattedMessage id="cyan" />
            </MenuItem>
            <MenuItem value="theme7">
              <FormattedMessage id="lime" />
            </MenuItem>
          </Select>
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <PaletteOutlinedIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText id="switch-list-label-font" primary={<Typography variant="h5">Font</Typography>} secondary="Select app font" />
          <Select displayEmpty labelId="settings-select-font" id="setting-select-font" value={fontFamily} onChange={handleChangeFont}>
            <MenuItem value={`'Inter', sans-serif`}>Inter</MenuItem>
            <MenuItem value={`'Roboto', sans-serif`}>Roboto</MenuItem>
            <MenuItem value={`'Poppins', sans-serif`}>Poppins</MenuItem>
            <MenuItem value={`'Public Sans', sans-serif`}>Public Sans</MenuItem>
          </Select>
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <DarkModeOutlinedIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText id="switch-list-label-dm" primary={<Typography variant="h5">Dark Mode</Typography>} secondary="Go dark" />
          <Switch
            edge="end"
            onChange={handleChangeMode}
            checked={mode === 'dark'}
            inputProps={{
              'aria-labelledby': 'switch-list-label-dm'
            }}
          />
        </ListItem>
      </List>
    </MainCard>
  );
};

export default TabSettings;
