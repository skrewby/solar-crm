import React from 'react';

// material-ui
import { Button, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// Internal Project
import { FormFields } from 'components/form/FormFields';
import { bpmAPI } from 'api/bpm/bpm-api';

// ============================|| JWT - LOGIN ||============================ //

const AuthCreatePassword = () => {
  const navigate = useNavigate();

  const submitPasswordChange = async (values) => {
    const user_id = window.localStorage.getItem('user_id');
    const res = await bpmAPI.createUserPassword(user_id, values);
    if (res.data) {
      navigate('/');
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      password: '',
      confirm: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
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
      touched: formik.touched.password,
      error: formik.errors.password,
      value: formik.values.password,
      label: 'Password',
      name: 'password'
    },
    {
      id: 2,
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
          Create Password
        </Button>
      </Stack>
    </>
  );
};

export default AuthCreatePassword;
