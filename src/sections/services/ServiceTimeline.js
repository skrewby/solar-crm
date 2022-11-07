import PropTypes from 'prop-types';
import { useState } from 'react';

// Material UI
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Project Import
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';

const ServiceTimeline = ({ service, status: initialStatus, getData }) => {
  const [visit, setVisit] = useState(service.visit?.date);
  const [scheduled, setScheduled] = useState(service.visit?.scheduled);
  const [status, setStatus] = useState(initialStatus);
  const [openCloseLeadDialog, setOpenCloseLeadDialog] = useState(false);
  const [openOpenLeadDialog, setOpenOpenLeadDialog] = useState(false);
  const [openClearVisitDialog, setOpenClearVisitDialog] = useState(false);

  const getVisitDate = () => {
    if (scheduled) {
      return visit;
    }
    return null;
  };

  const updateVisit = async (newValue) => {
    const newVisit = newValue;
    setVisit(newVisit);
    if (newVisit) {
      setScheduled(true);
      await bpmAPI.updateService(service.id, { visit_scheduled: true, visit: newVisit });
    } else {
      setScheduled(false);
      await bpmAPI.updateService(service.id, { visit_scheduled: false });
    }
  };

  const getIcon = (id) => {
    if (status === id) {
      if (id === 4) {
        return <DoneOutlineOutlinedIcon />;
      }
      return <MoreHorizOutlinedIcon />;
    } else if (status > id) {
      return <DoneOutlineOutlinedIcon />;
    } else {
      return <Box sx={{ width: '1.2rem', height: '1.2rem' }} />;
    }
  };

  return (
    <MainCard title="Timeline" secondary={<Box sx={{ width: '1.5rem', height: '2.25rem' }} />}>
      {initialStatus !== 5 && (
        <>
          <Timeline
            sx={{
              '& .MuiTimelineItem-root:before': {
                flex: 0
              },
              '& .MuiTimelineItem-root': { minHeight: 80 },
              '& .MuiTimelineOppositeContent-root': { mt: 0.5 },
              '& .MuiTimelineDot-root': {
                boxShadow: 'none',
                margin: 0,
                ml: 1.25,
                mr: 1.25,
                p: 1,
                '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
              },
              '& .MuiTimelineContent-root': { borderRadius: 1, height: '100%' },
              '& .MuiTimelineConnector-root': { border: '1px dashed', borderColor: 'secondary.light', bgcolor: 'transparent' },

              my: 0,
              p: 0
            }}
          >
            <TimelineItem
              onClick={async () => {
                const res = await bpmAPI.updateService(service.id, { status_id: 1 });
                res.data && setStatus(1);
              }}
            >
              <TimelineSeparator>
                <TimelineDot sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>{getIcon(1)}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span">
                  New
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem
              onClick={async () => {
                const res = await bpmAPI.updateService(service.id, { status_id: 2 });
                res.data && setStatus(2);
              }}
            >
              <TimelineSeparator>
                <TimelineDot sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>{getIcon(2)}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>In Progress</TimelineContent>
            </TimelineItem>
            <TimelineItem
              onClick={async () => {
                const res = await bpmAPI.updateService(service.id, { status_id: 3 });
                res.data && setStatus(3);
              }}
            >
              <TimelineSeparator>
                <TimelineDot sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>{getIcon(3)}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Quotation</TimelineContent>
            </TimelineItem>
            <TimelineItem
              onClick={async () => {
                const res = await bpmAPI.updateService(service.id, { status_id: 4 });
                res.data && setStatus(4);
              }}
              sx={{ minHeight: 'auto' }}
            >
              <TimelineSeparator>
                <TimelineDot sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>{getIcon(4)}</TimelineDot>
              </TimelineSeparator>
              <TimelineContent>Complete</TimelineContent>
            </TimelineItem>
          </Timeline>
          <Divider />
          <Stack sx={{ my: 2 }} spacing={2}>
            <Stack direction="row">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  inputFormat="dd/MM/yyyy hh:mm aaa"
                  label="Visit"
                  value={getVisitDate()}
                  onChange={updateVisit}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <IconButton justify="center" color="error" onClick={() => setOpenClearVisitDialog(true)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
          <Button
            sx={{ my: 2 }}
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              setOpenCloseLeadDialog(true);
            }}
          >
            Close
          </Button>
        </>
      )}
      {initialStatus === 5 && (
        <>
          <Typography color="error">Closed</Typography>
          <Divider />
          <Button
            sx={{ my: 2 }}
            fullWidth
            variant="contained"
            onClick={() => {
              setOpenOpenLeadDialog(true);
            }}
          >
            Open
          </Button>
        </>
      )}
      <ConfirmDialog
        open={openCloseLeadDialog}
        onClose={() => setOpenCloseLeadDialog(false)}
        title="Close Lead"
        description="Are you sure you want to close this lead?"
        onConfirm={async () => {
          await bpmAPI.updateService(service.id, { status_id: 5 });
          getData();
        }}
      />
      <ConfirmDialog
        open={openOpenLeadDialog}
        onClose={() => setOpenOpenLeadDialog(false)}
        title="Open Lead"
        description="Are you sure you want to open this lead?"
        onConfirm={async () => {
          await bpmAPI.updateService(service.id, { status_id: 1 });
          getData();
        }}
      />
      <ConfirmDialog
        open={openClearVisitDialog}
        onClose={() => setOpenClearVisitDialog(false)}
        title="Cancel Visit"
        description="Are you sure you want to cancel this visit?"
        onConfirm={() => {
          updateVisit(null);
          setOpenClearVisitDialog(false);
        }}
      />
    </MainCard>
  );
};

ServiceTimeline.propTypes = {
  getData: PropTypes.func,
  service: PropTypes.any,
  status: PropTypes.number
};

export default ServiceTimeline;
