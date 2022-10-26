import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import EditCustomerForm from './forms/EditCustomerForm';

const CustomerDetails = ({ data, setData, details }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const onCustomerEdit = (values) => {
    setData(values);
  };

  return (
    <>
      <MainCard
        title="Details"
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <EditTwoToneIcon />
          </IconButton>
        }
      >
        <Grid container spacing={3}>
          {details.map((field) => {
            return (
              <Grid item key={field.id} xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">{field.label}</Typography>
                  <Typography>{field.value || '-'}</Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </MainCard>
      <EditCustomerForm customer={data} openDialog={openDialog} setOpenDialog={setOpenDialog} onFormSubmit={onCustomerEdit} />
    </>
  );
};

CustomerDetails.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  details: PropTypes.array
};

export default CustomerDetails;
