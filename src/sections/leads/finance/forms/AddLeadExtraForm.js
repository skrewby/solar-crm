import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddLeadExtraForm = ({ id, openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    const res = await bpmAPI.addLeadExtra(id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Item Added',
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
      label: '',
      price: 0,
      submit: null
    },
    validationSchema: Yup.object().shape({
      label: Yup.string().required('Required'),
      price: Yup.number().required('Required')
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
      width: 8,
      variant: 'Input',
      touched: formik.touched.label,
      error: formik.errors.label,
      value: formik.values.label,
      label: 'Label',
      name: 'label'
    },
    {
      id: 2,
      width: 4,
      variant: 'Input',
      touched: formik.touched.price,
      error: formik.errors.price,
      value: formik.values.price,
      label: 'Price',
      name: 'price'
    }
  ];

  return <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add Item" formik={formik} formikFields={formikFields} />;
};

AddLeadExtraForm.propTypes = {
  id: PropTypes.string,
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default AddLeadExtraForm;
