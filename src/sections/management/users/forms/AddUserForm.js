import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddUserForm = ({ openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    const res = await bpmAPI.addUser(values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'User Added',
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
      username: '',
      email: '',
      phone: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Required'),
      email: Yup.string().email().required('Required'),
      phone: Yup.string().required('Required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await submitForm(values);
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
      width: 6,
      variant: 'Input',
      touched: formik.touched.username,
      error: formik.errors.username,
      value: formik.values.username,
      label: 'Username',
      name: 'username'
    },
    {
      id: 2,
      width: 6,
      variant: 'Input',
      touched: formik.touched.email,
      error: formik.errors.email,
      value: formik.values.email,
      label: 'Email',
      name: 'email'
    },
    {
      id: 3,
      width: 6,
      variant: 'Input',
      touched: formik.touched.phone,
      error: formik.errors.phone,
      value: formik.values.phone,
      label: 'Contact',
      name: 'phone'
    }
  ];

  return <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add User" formik={formik} formikFields={formikFields} />;
};

AddUserForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default AddUserForm;
