import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const UpdateCustomerDetailsForm = ({ data, openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    const res = await bpmAPI.updateLead(data.id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Customer Updated',
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
    validateOnChange: true,
    initialValues: {
      first_name: data.customer.first_name || '',
      last_name: data.customer.last_name || '',
      company_name: data.customer.company_name || '',
      company_abn: data.customer.company_abn || '',
      email: data.customer.email || '',
      phone: data.customer.phone || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string(),
      last_name: Yup.string(),
      company_name: Yup.string(),
      company_abn: Yup.string(),
      email: Yup.string().email('Must be a valid Email'),
      phone: Yup.string()
    }),
    onSubmit: async (values, helpers) => {
      try {
        // eslint-disable-next-line no-unused-vars
        const form_values = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== null && v !== ''));
        await submitForm(form_values);
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
      touched: formik.touched.first_name,
      error: formik.errors.first_name,
      value: formik.values.first_name,
      label: 'First Name',
      name: 'first_name'
    },
    {
      id: 2,
      width: 6,
      variant: 'Input',
      touched: formik.touched.last_name,
      error: formik.errors.last_name,
      value: formik.values.last_name,
      label: 'Last Name',
      name: 'last_name'
    },
    {
      id: 3,
      width: 6,
      variant: 'Input',
      touched: formik.touched.company_name,
      error: formik.errors.company_name,
      value: formik.values.company_name,
      label: 'Company Name',
      name: 'company_name'
    },
    {
      id: 4,
      width: 6,
      variant: 'Input',
      touched: formik.touched.company_abn,
      error: formik.errors.company_abn,
      value: formik.values.company_abn,
      label: 'Company ABN',
      name: 'company_abn'
    },
    {
      id: 5,
      width: 6,
      variant: 'Input',
      touched: formik.touched.email,
      error: formik.errors.email,
      value: formik.values.email,
      label: 'Email',
      name: 'email'
    },
    {
      id: 6,
      width: 6,
      variant: 'Input',
      touched: formik.touched.phone,
      error: formik.errors.phone,
      value: formik.values.phone,
      label: 'Phone',
      name: 'phone'
    }
  ];

  return (
    <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Edit Customer" formik={formik} formikFields={formikFields} />
  );
};

UpdateCustomerDetailsForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  data: PropTypes.any
};

export default UpdateCustomerDetailsForm;
