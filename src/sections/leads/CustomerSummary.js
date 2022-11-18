import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import UpdateCustomerDetailsForm from './forms/UpdateCustomerDetailsForm';

const CustomerSummary = ({ data, details, onFormSubmit }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <MainCard
        title="Customer"
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
      <UpdateCustomerDetailsForm data={data} openDialog={openDialog} setOpenDialog={setOpenDialog} onFormSubmit={onFormSubmit} />
    </>
  );
};

CustomerSummary.propTypes = {
  data: PropTypes.any,
  details: PropTypes.array,
  onFormSubmit: PropTypes.func
};

export default CustomerSummary;
