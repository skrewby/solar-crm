import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddServiceFileForm = ({ openDialog, setOpenDialog, onFormSubmit, service_id }) => {
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    const res = await bpmAPI.addServiceFile(service_id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Service File Added',
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
      file_id: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      file_id: Yup.string().required('Required')
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
      width: 12,
      variant: 'Upload',
      touched: formik.touched.file_id,
      error: formik.errors.file_id,
      formik: formik,
      label: 'Upload File',
      name: 'file_id',
      multiple: true
    }
  ];

  return (
    <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Upload File" formik={formik} formikFields={formikFields} />
  );
};

AddServiceFileForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  service_id: PropTypes.string
};

export default AddServiceFileForm;
