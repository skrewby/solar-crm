import PropTypes from 'prop-types';

// Material UI
import { FormHelperText, InputLabel, Stack, TextField } from '@mui/material';

export const InputField = ({ label, name, onBlur, onChange, placeholder = '', value, touched, error, type }) => {
  return (
    <Stack spacing={1.25}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <TextField fullWidth id={name} value={value} name={name} onBlur={onBlur} onChange={onChange} placeholder={placeholder} type={type} />
      {touched && error && (
        <FormHelperText error id={`${name}-helper`}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.string
};
