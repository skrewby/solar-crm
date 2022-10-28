import PropTypes from 'prop-types';

// Material UI
import { Box, Typography } from '@mui/material';

const StatusCell = ({ value }) => {
  const label = value.label || 'Unknown';
  const colour = value.colour || '#768989';
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <Box
        sx={{
          backgroundColor: colour,
          borderRadius: '50%',
          height: 8,
          width: 8
        }}
      />
      <Typography
        sx={{
          colour,
          ml: 1.75
        }}
        variant="body2"
      >
        {label}
      </Typography>
    </Box>
  );
};

StatusCell.propTypes = {
  value: PropTypes.any
};

export default StatusCell;
