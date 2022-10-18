import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Chip } from '@mui/material';

const ToggleCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    updateMyData(index, id, !value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (value) {
    return <Chip onClick={toggle} color="success" label="Enabled" size="small" variant="light" />;
  } else {
    return <Chip onClick={toggle} color="error" label="Disabled" size="small" variant="light" />;
  }
};

ToggleCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object,
  column: PropTypes.object,
  updateMyData: PropTypes.func
};

export default ToggleCell;
