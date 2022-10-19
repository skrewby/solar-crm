import PropTypes from 'prop-types';

// Material UI
import { FormHelperText, InputLabel, Stack, Select, MenuItem } from '@mui/material';

export const SelectField = ({ label, name, onChange, value, touched, error, options }) => {
  return (
    <Stack spacing={1.25}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
        {options.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error && (
        <FormHelperText error id={`${name}-helper`}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array
};
