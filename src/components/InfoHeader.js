import PropTypes from 'prop-types';

// Material UI
import { Breadcrumbs, Link, Typography, Grid, Divider } from '@mui/material';

// Project Import
import MainCard from './MainCard';

const InfoHeader = ({ navigation, currentLocation, title }) => {
  return (
    <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} content={false} shadow="none">
      <Grid container direction={'column'} justifyContent={'flex-start'} alignItems={'flex-start'} spacing={1}>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            {navigation.map((item) => {
              return (
                <Link key={item.id} underline="hover" color="inherit" href={item.href}>
                  {item.label}
                </Link>
              );
            })}
            <Typography variant="subtitle1" color="textPrimary">
              {currentLocation}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item sx={{ mt: 0.25 }}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Divider sx={{ mt: 2 }} />
      </Grid>
    </MainCard>
  );
};

InfoHeader.propTypes = {
  navigation: PropTypes.array,
  currentLocation: PropTypes.string,
  title: PropTypes.string
};

export default InfoHeader;
