import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Autocomplete, FormHelperText, InputLabel, Stack, TextField } from '@mui/material';

export const AutocompleteField = ({ formik, initialValue, label, name, options, touched, error, placeholder = '' }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Stack spacing={1.25}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          formik.setFieldValue(name, newValue.id);
          setValue(newValue);
        }}
        getOptionLabel={(option) => option.label}
        disableClearable
        isOptionEqualToValue={(option, value) => option.id === value.id}
        id={name}
        options={options}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      />
      {touched && error && (
        <FormHelperText error id={`${name}-helper`}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};

AutocompleteField.propTypes = {
  formik: PropTypes.any,
  initialValue: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  touched: PropTypes.bool,
  error: PropTypes.string
};
