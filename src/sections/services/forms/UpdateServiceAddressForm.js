import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const UpdateServiceAddressForm = ({ service, openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);

  const getData = useCallback(async () => {
    setStates([]);

    try {
      const state_result = await bpmAPI.getStates();
      if (state_result.data) {
        setStates(state_result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const submitForm = async (values) => {
    const res = await bpmAPI.updateService(service.id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Address Updated',
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
      street: service.property.street || '',
      suburb: service.property.suburb || '',
      state: service.property.state_id || '',
      postcode: service.property.postcode || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      street: Yup.string().required('Required'),
      suburb: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      postcode: Yup.string().required('Required')
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
      id: 2,
      width: 12,
      variant: 'Input',
      touched: formik.touched.street,
      error: formik.errors.street,
      value: formik.values.street,
      label: 'Street',
      name: 'street'
    },
    {
      id: 3,
      width: 6,
      variant: 'Input',
      touched: formik.touched.suburb,
      error: formik.errors.suburb,
      value: formik.values.suburb,
      label: 'Suburb',
      name: 'suburb'
    },
    {
      id: 4,
      width: 3,
      variant: 'Select',
      touched: formik.touched.state,
      error: formik.errors.state,
      value: formik.values.state,
      label: 'State',
      name: 'state',
      options: states
    },
    {
      id: 5,
      width: 3,
      variant: 'Input',
      touched: formik.touched.postcode,
      error: formik.errors.postcode,
      value: formik.values.postcode,
      label: 'Postcode',
      name: 'postcode'
    }
  ];

  return (
    <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Update Address" formik={formik} formikFields={formikFields} />
  );
};

UpdateServiceAddressForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  service: PropTypes.any
};

export default UpdateServiceAddressForm;
