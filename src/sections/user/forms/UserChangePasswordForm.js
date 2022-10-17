import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Material UI
import { Button, Stack } from '@mui/material';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { FormFields } from 'components/form/FormFields';
import { openSnackbar } from 'store/reducers/snackbar';
import useAuth from 'hooks/useAuth';

const UserChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const submitPasswordChange = async (values) => {
    const res = await bpmAPI.changeUserPassword(user.id, values);
    if (res.data) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Password Changed',
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
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      old_password: '',
      password: '',
      confirm: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      old_password: Yup.string().required('Old Password is required'),
      password: Yup.string().required('New Password is required'),
      confirm: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], "Passwords don't match.")
    }),
    onSubmit: async (values, helpers) => {
      try {
        await submitPasswordChange(values);
        helpers.resetForm();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message.message });
        helpers.setSubmitting(false);
      }
    }
  });
  const formikFields = [
    {
      id: 1,
      width: 12,
      variant: 'Password',
      touched: formik.touched.old_password,
      error: formik.errors.old_password,
      value: formik.values.old_password,
      label: 'Current Password',
      name: 'old_password'
    },
    {
      id: 2,
      width: 12,
      variant: 'Password',
      touched: formik.touched.password,
      error: formik.errors.password,
      value: formik.values.password,
      label: 'New Password',
      name: 'password'
    },
    {
      id: 3,
      width: 12,
      variant: 'Password',
      touched: formik.touched.confirm,
      error: formik.errors.confirm,
      value: formik.values.confirm,
      label: 'Retype Password',
      name: 'confirm'
    }
  ];

  return (
    <>
      <FormFields formik={formik} fields={formikFields} width={12} />
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ p: 2.5 }}>
        <Button
          disabled={formik.isSubmitting}
          variant="contained"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Save
        </Button>
      </Stack>
    </>
  );
};

export default UserChangePasswordForm;
