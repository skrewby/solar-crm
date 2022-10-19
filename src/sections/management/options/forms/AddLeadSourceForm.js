import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddLeadSourceForm = ({ openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    const res = await bpmAPI.createLeadSource(values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Lead Source Added',
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
      reference: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      label: Yup.string().required('Source name is required'),
      reference: Yup.string().required('Source reference is required')
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
      touched: formik.touched.label,
      error: formik.errors.label,
      value: formik.values.label,
      label: 'Source',
      name: 'label'
    },
    {
      id: 2,
      width: 6,
      variant: 'Input',
      touched: formik.touched.reference,
      error: formik.errors.reference,
      value: formik.values.reference,
      label: 'Reference',
      name: 'reference'
    }
  ];

  return (
    <FormDialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      title="Add Lead Source"
      formik={formik}
      formikFields={formikFields}
    />
  );
};

AddLeadSourceForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default AddLeadSourceForm;
