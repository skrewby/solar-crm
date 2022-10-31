import PropTypes from 'prop-types';

// Material UI
import { Box, Typography } from '@mui/material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

// Project Import
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';

const ServiceTimeline = ({ service_id, status, getData }) => {
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
    <MainCard title="Timeline">
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
            await bpmAPI.updateService(service_id, { status_id: 1 });
            getData();
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
            await bpmAPI.updateService(service_id, { status_id: 2 });
            getData();
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
            await bpmAPI.updateService(service_id, { status_id: 3 });
            getData();
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
            await bpmAPI.updateService(service_id, { status_id: 4 });
            getData();
          }}
          sx={{ minHeight: 'auto' }}
        >
          <TimelineSeparator>
            <TimelineDot sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>{getIcon(4)}</TimelineDot>
          </TimelineSeparator>
          <TimelineContent>Complete</TimelineContent>
        </TimelineItem>
      </Timeline>
    </MainCard>
  );
};

ServiceTimeline.propTypes = {
  getData: PropTypes.func,
  service_id: PropTypes.string,
  status: PropTypes.number
};

export default ServiceTimeline;
