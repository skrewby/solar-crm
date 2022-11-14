import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import UpdateLeadProperty from './forms/UpdateLeadProperty';
import { bpmAPI } from 'api/bpm/bpm-api';

const LeadProperty = ({ lead, setLead }) => {
  const [data, setData] = useState(lead);
  const [openDialog, setOpenDialog] = useState(false);

  const onFormSubmit = async (values) => {
    setData(values);
    const result = await bpmAPI.getLead(lead.id);
    result.data && setLead(result.data);
  };

  return (
    <>
      <MainCard
        title="Property"
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <EditTwoToneIcon />
          </IconButton>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Phases</Typography>
              <Typography>{data.property.phase || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Existing System</Typography>
              <Typography>{data.property.existing_system || '-'}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      <UpdateLeadProperty data={data} openDialog={openDialog} setOpenDialog={setOpenDialog} onFormSubmit={onFormSubmit} />
    </>
  );
};

LeadProperty.propTypes = {
  lead: PropTypes.any,
  setLead: PropTypes.any
};

export default LeadProperty;
