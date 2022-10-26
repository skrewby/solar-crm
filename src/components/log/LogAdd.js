import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { IconButton, TextField } from '@mui/material';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

const LogAdd = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const addLog = () => {
    if (value) {
      if (onAdd) {
        onAdd(value);
      } else {
        console.error('onAdd function not defined');
      }
    }
  };

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          addLog();
          setValue('');
          ev.preventDefault();
        }
      }}
      InputProps={{
        endAdornment: (
          <IconButton justify="center" color="primary" onClick={addLog}>
            <SendTwoToneIcon />
          </IconButton>
        )
      }}
    />
  );
};

LogAdd.propTypes = {
  onAdd: PropTypes.func
};

export default LogAdd;
