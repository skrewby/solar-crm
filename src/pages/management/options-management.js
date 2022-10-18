// Material UI
import { Grid } from '@mui/material';
import LeadSourceOptions from 'sections/management/options/LeadSourceOptions';

// Project Import
import RoleOptions from 'sections/management/options/RoleOptions';

// ==============================|| SAMPLE PAGE ||============================== //

const OptionsManagement = () => (
  <Grid container spacing={2}>
    <Grid item sm={6} xs={12}>
      <RoleOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <LeadSourceOptions />
    </Grid>
  </Grid>
);

export default OptionsManagement;
