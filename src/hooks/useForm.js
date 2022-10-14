import { useFormik } from 'formik';

const useForm = ({ initialValues, validationSchema, handleSubmit }) => {
  return useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        handleSubmit(values);
        helpers.resetForm();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
};

export default useForm;
