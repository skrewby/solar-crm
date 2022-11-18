import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import UpdateLeadInfo from './forms/UpdateLeadInfo';
import { bpmAPI } from 'api/bpm/bpm-api';

const LeadInformation = ({ lead }) => {
  const [data, setData] = useState(lead);
  const [openDialog, setOpenDialog] = useState(false);

  const onFormSubmit = (values) => {
    setData(values);
  };

  return (
    <>
      <MainCard
        title="Lead Details"
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <EditTwoToneIcon />
          </IconButton>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Panel Design</Typography>
              <Typography
                sx={{
                  '&.MuiTypography-root': { cursor: 'pointer' }
                }}
                color={data.system.panel_design && 'primary'}
                onClick={() => {
                  if (data.system.panel_design) {
                    bpmAPI.downloadFile(data.system.panel_design, `Panel Design - ${data.address.full}`);
                  }
                }}
              >
                {data.system.panel_design ? 'Download' : '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Proposal</Typography>
              <Typography
                sx={{
                  '&.MuiTypography-root': { cursor: 'pointer' }
                }}
                color={data.system.proposal && 'primary'}
                onClick={() => {
                  if (data.system.proposal) {
                    bpmAPI.downloadFile(data.system.proposal, `Proposal - ${data.address.full}`);
                  }
                }}
              >
                {data.system.proposal ? 'Download' : '-'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Description</Typography>
              <Typography>{data.description || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Assigned Sales</Typography>
              <Typography>{data.sales.label || '-'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="secondary">Source</Typography>
              <Typography>{data.source.label || '-'}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      <UpdateLeadInfo data={data} openDialog={openDialog} setOpenDialog={setOpenDialog} onFormSubmit={onFormSubmit} />
    </>
  );
};

LeadInformation.propTypes = {
  lead: PropTypes.any
};

export default LeadInformation;
