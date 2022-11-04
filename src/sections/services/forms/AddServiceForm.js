import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddServiceForm = ({ openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [states, setStates] = useState([]);

  const getData = useCallback(async () => {
    setCustomers([]);
    setStates([]);

    try {
      const result = await bpmAPI.getCustomers();
      if (result.data) {
        const customer_data = result.data.map((data) => {
          const getCustomerName = () => {
            if (!data.company_name && !data.first_name && !data.last_name) {
              return 'Customer';
            }
            if (data.company_name) {
              return data.company_name;
            } else if (!data.first_name && data.last_name) {
              return data.last_name;
            }
            return `${data.first_name} ${data.last_name}`;
          };

          return {
            id: data.id,
            label: getCustomerName()
          };
        });
        setCustomers(customer_data);
      }

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
    const res = await bpmAPI.addService(values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Service Added',
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
      customer_id: '',
      street: '',
      suburb: '',
      state: '',
      postcode: '',
      description: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      customer_id: Yup.string().required('Required'),
      street: Yup.string().required('Required'),
      suburb: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      postcode: Yup.string().required('Required'),
      description: Yup.string().required('Required')
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
      variant: 'Autocomplete',
      touched: formik.touched.customer_id,
      error: formik.errors.customer_id,
      label: 'Customer',
      name: 'customer_id',
      formik: formik,
      options: customers
    },
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
    },
    {
      id: 6,
      width: 12,
      variant: 'Input',
      touched: formik.touched.description,
      error: formik.errors.description,
      value: formik.values.description,
      label: 'Description',
      name: 'description'
    }
  ];

  return (
    <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add Service" formik={formik} formikFields={formikFields} />
  );
};

AddServiceForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default AddServiceForm;
