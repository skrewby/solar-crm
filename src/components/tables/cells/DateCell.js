import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

// Material UI
import { Typography } from '@mui/material';

const DateCell = ({ value }) => {
  if (value) {
    return <Typography>{`${format(parseISO(value), 'dd MMM yyyy HH:mm')}`}</Typography>;
  }
  return <Typography>-</Typography>;
};

DateCell.propTypes = {
  value: PropTypes.any
};

export default DateCell;
