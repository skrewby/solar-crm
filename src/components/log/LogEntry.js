import PropTypes from 'prop-types';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';

// Material UI
import { Avatar, Box, Stack, Typography } from '@mui/material';

// Project Import
import MainCard from 'components/MainCard';

const LogEntry = ({ log }) => {
  return (
    <MainCard border sx={{ height: '100%' }}>
      <Stack direction="row" spacing={2}>
        <Avatar variant="circular" src={'/src/assets/users/default.png'} />
        <Box
          sx={{
            flex: 1
          }}
        >
          <Typography variant="h5">{log.created_by}</Typography>
          {log.auto === true ? (
            <Typography sx={{ fontStyle: 'italic', my: 0.5 }} variant="h6">
              {log.msg}
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ my: 0.5 }}>
              {log.msg}
            </Typography>
          )}
          <Typography color="textSecondary" variant="caption">
            {`${format(parseISO(log.create_date), 'dd MMM yyyy HH:mm')}`}
          </Typography>
        </Box>
      </Stack>
    </MainCard>
  );
};

LogEntry.propTypes = {
  log: PropTypes.any
};

export default LogEntry;
