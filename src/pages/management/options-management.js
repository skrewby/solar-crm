// Material UI
import { Grid } from '@mui/material';

// Project Import
import RoleOptions from 'sections/management/options/RoleOptions';
import StoryOptions from 'sections/management/options/StoryOptions';
import ExistingSystemOptions from 'sections/management/options/ExistingSystemOptions';
import LeadSourceOptions from 'sections/management/options/LeadSourceOptions';
import PhaseOptions from 'sections/management/options/PhaseOptions';
import RoofTypeOptions from 'sections/management/options/RoofTypeOptions';
import RoofPitchOptions from 'sections/management/options/RoofPitchOptions';
import StockTypeOptions from 'sections/management/options/StockTypeOptions';
import StateOptions from 'sections/management/options/StateOptions';

// ==============================|| SAMPLE PAGE ||============================== //

const OptionsManagement = () => (
  <Grid container spacing={2}>
    <Grid item sm={6} xs={12}>
      <RoleOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <LeadSourceOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <PhaseOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <StoryOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <ExistingSystemOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <RoofTypeOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <RoofPitchOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <StockTypeOptions />
    </Grid>
    <Grid item sm={6} xs={12}>
      <StateOptions />
    </Grid>
  </Grid>
);

export default OptionsManagement;
