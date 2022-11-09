import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddServiceItemForm = ({ openDialog, setOpenDialog, onFormSubmit, service_id }) => {
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    const res = await bpmAPI.addServiceItem(service_id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Service Item Added',
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
      description: '',
      price: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required')
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
      touched: formik.touched.description,
      error: formik.errors.description,
      value: formik.values.description,
      label: 'Description',
      name: 'description'
    },
    {
      id: 2,
      width: 6,
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

AddServiceItemForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  service_id: PropTypes.string
};

export default AddServiceItemForm;
