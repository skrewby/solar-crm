import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import UpdateAddressForm from './forms/UpdateAddressForm';

const PropertyAddress = ({ data, onFormSubmit }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <MainCard
        title="Address"
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <EditTwoToneIcon />
          </IconButton>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Full Address</Typography>
              <Typography>{data.address.full || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Street</Typography>
              <Typography>{data.address.street || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Suburb</Typography>
              <Typography>{data.address.suburb || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack spacing={0.5}>
              <Typography color="secondary">State</Typography>
              <Typography>{data.address.state || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Postcode</Typography>
              <Typography>{data.address.postcode || '-'}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      <UpdateAddressForm data={data} openDialog={openDialog} setOpenDialog={setOpenDialog} onFormSubmit={onFormSubmit} />
    </>
  );
};

PropertyAddress.propTypes = {
  data: PropTypes.any,
  onFormSubmit: PropTypes.func
};

export default PropertyAddress;
