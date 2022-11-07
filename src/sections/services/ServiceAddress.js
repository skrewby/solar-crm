import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import UpdateServiceAddressForm from './forms/UpdateServiceAddressForm';

const ServiceAddress = ({ service, onFormSubmit }) => {
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
              <Typography>{service.property.address || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Street</Typography>
              <Typography>{service.property.street || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Suburb</Typography>
              <Typography>{service.property.suburb || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack spacing={0.5}>
              <Typography color="secondary">State</Typography>
              <Typography>{service.property.state || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Postcode</Typography>
              <Typography>{service.property.postcode || '-'}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      <UpdateServiceAddressForm service={service} openDialog={openDialog} setOpenDialog={setOpenDialog} onFormSubmit={onFormSubmit} />
    </>
  );
};

ServiceAddress.propTypes = {
  service: PropTypes.any,
  onFormSubmit: PropTypes.func
};

export default ServiceAddress;
