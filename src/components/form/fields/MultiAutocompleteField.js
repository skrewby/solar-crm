import PropTypes from 'prop-types';

// Material UI
import { Autocomplete, FormHelperText, InputLabel, Stack, TextField } from '@mui/material';

export const MultiAutocompleteField = ({ label, name, onChange, options, value, touched, error, placeholder = '' }) => {
  return (
    <Stack spacing={1.25}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Autocomplete
        multiple
        limitTags={3}
        id={name}
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
        onChange={(event, value, reason) => {
          onChange(value, reason);
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            p: 1
          },
          '& .MuiAutocomplete-tag': {
            bgcolor: 'primary.lighter',
            border: '1px solid',
            borderRadius: 1,
            height: 32,
            pl: 1.5,
            pr: 1.5,
            lineHeight: '32px',
            borderColor: 'primary.light',
            '& .MuiChip-label': {
              paddingLeft: 0,
              paddingRight: 0
            },
            '& .MuiSvgIcon-root': {
              color: 'primary.main',
              ml: 1,
              mr: -0.75,
              '&:hover': {
                color: 'primary.dark'
              }
            }
          }
        }}
      />
      {touched && error && (
        <FormHelperText error id={`${name}-helper`}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};

MultiAutocompleteField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  touched: PropTypes.bool,
  error: PropTypes.string
};
