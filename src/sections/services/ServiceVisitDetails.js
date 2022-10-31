import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';

const ServiceVisitDetails = () => {
  return (
    <>
      <MainCard
        title="Visit"
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <EditTwoToneIcon />
          </IconButton>
        }
      >
        <Grid container spacing={3}></Grid>
      </MainCard>
    </>
  );
};

ServiceVisitDetails.propTypes = {
  data: PropTypes.any,
  onFormSubmit: PropTypes.func
};

export default ServiceVisitDetails;
