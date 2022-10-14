import { useDispatch } from 'react-redux';

// project import
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';

// third party
import * as Yup from 'yup';

// assets
import { bpmAPI } from 'api/bpm/bpm-api';
import useForm from 'hooks/useForm';
import { FormFields } from 'components/form/FormFields';
import { Button, Grid, Stack } from '@mui/material';

// ==============================|| TAB - PASSWORD CHANGE ||============================== //

const TabPassword = () => {
  const dispatch = useDispatch();

  const submitPasswordChange = async (values) => {
    console.log('Change');
    const res = await bpmAPI.changeUserPassword(user.id, values);
    if (res.data) {
      refreshUser();
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

  const formik = useForm({
    initialValues: {
      old_password: '',
      password: '',
      confirm: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      old: Yup.string().required('Old Password is required'),
      password: Yup.string().required('New Password is required'),
      confirm: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], "Passwords don't match.")
    }),
    handleSubmit: submitPasswordChange
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
    <MainCard title="Change Password">
      <Grid container>
        <FormFields formik={formik} fields={formikFields} />
      </Grid>
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
    </MainCard>
  );
};

export default TabPassword;
