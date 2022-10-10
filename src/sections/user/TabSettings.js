import { useState } from 'react';

// material-ui
import { Button, List, ListItem, ListItemIcon, ListItemText, Stack, Switch, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

// ==============================|| TAB - SETTINGS ||============================== //

const TabSettings = () => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <MainCard title="Settings">
      <List sx={{ '& .MuiListItem-root': { p: 2 } }}>
        <ListItem divider>
          <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <DarkModeOutlinedIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText id="switch-list-label-dm" primary={<Typography variant="h5">Dark Mode</Typography>} secondary="Go dark" />
          <Switch
            edge="end"
            onChange={handleToggle('dm')}
            checked={checked.indexOf('dm') !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-dm'
            }}
          />
        </ListItem>
      </List>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained">Save</Button>
      </Stack>
    </MainCard>
  );
};

export default TabSettings;
