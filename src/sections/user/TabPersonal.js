// material-ui
import { useOutletContext } from 'react-router';

import { useDispatch } from 'react-redux';

// material-ui
import { Box, Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { openSnackbar } from 'store/reducers/snackbar';
// import { useInputRef } from './index';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import { bpmAPI } from 'api/bpm/bpm-api';

// assets

// styles & constant
function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const { user, refreshUser } = useAuth();

  const dispatch = useDispatch();
  const inputRef = useInputRef();

  return (
    <MainCard content={false} title="Account Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          phone: Yup.string().max(255)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const res = await bpmAPI.updateUser(user.id, values);
            if (res.data) {
              refreshUser();
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Profile updated successfully.',
                  variant: 'success',
                  close: false
                })
              );
            } else {
              dispatch(
                openSnackbar({
                  open: true,
                  message: res.message || 'Error',
                  variant: 'error',
                  close: false
                })
              );
            }
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-user-name">User Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-user-name"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Username"
                      autoFocus
                      inputRef={inputRef}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id="personal-username-helper">
                        {errors.username}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="personal-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-phone">Contact Number</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-phone"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Contact Number"
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="personal-phone-helper">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ p: 2.5 }}>
              <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default TabPersonal;
