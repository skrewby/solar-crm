// Material UI
import { Grid } from '@mui/material';

// Project Import
import RoleOptions from 'sections/management/options/RoleOptions';

// ==============================|| SAMPLE PAGE ||============================== //

const OptionsManagement = () => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <RoleOptions />
    </Grid>
  </Grid>
);

export default OptionsManagement;
