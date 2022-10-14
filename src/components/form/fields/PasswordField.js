import { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { FormHelperText, InputLabel, Stack, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export const PasswordField = ({ label, name, onBlur, onChange, placeholder = '', value, touched, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack spacing={1.25}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        placeholder={placeholder}
        id={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
              color="secondary"
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </IconButton>
          </InputAdornment>
        }
        inputProps={{}}
      />
      {touched && error && (
        <FormHelperText error id={`${name}-helper`}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string
};
