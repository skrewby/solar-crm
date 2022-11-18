import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddLeadForm = ({ openDialog, setOpenDialog, onFormSubmit }) => {
  const [states, setStates] = useState([]);
  const [sources, setSources] = useState([]);
  const [sales, setSales] = useState([]);

  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    setStates([]);
    setSources([]);
    setSales([]);

    try {
      const state_result = await bpmAPI.getStates();
      if (state_result.data) {
        setStates(state_result.data);
      }

      const sources_result = await bpmAPI.getLeadSources();
      if (sources_result.data) {
        setSources(sources_result.data);
      }

      const usersResult = await bpmAPI.getSalesUsers();
      if (usersResult.data) {
        const salesResult = usersResult.data.map((user) => {
          return {
            id: user.id,
            label: user.username
          };
        });
        setSales(salesResult);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const submitForm = async (values) => {
    const res = await bpmAPI.addLead(values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Lead Added',
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
      first_name: '',
      last_name: '',
      company_name: '',
      company_abn: '',
      email: '',
      phone: '',
      sales_id: '',
      source_id: '',
      description: '',
      street: '',
      suburb: '',
      state: '',
      postcode: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string(),
      last_name: Yup.string(),
      company_name: Yup.string(),
      company_abn: Yup.string(),
      email: Yup.string().email('Must be a valid Email'),
      phone: Yup.string(),
      sales_id: Yup.string(),
      source_id: Yup.string(),
      description: Yup.string(),
      street: Yup.string(),
      suburb: Yup.string(),
      state: Yup.string(),
      postcode: Yup.string()
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
    },
    {
      id: 7,
      width: 12,
      variant: 'Input',
      touched: formik.touched.street,
      error: formik.errors.street,
      value: formik.values.street,
      label: 'Street',
      name: 'street'
    },
    {
      id: 8,
      width: 6,
      variant: 'Input',
      touched: formik.touched.suburb,
      error: formik.errors.suburb,
      value: formik.values.suburb,
      label: 'Suburb',
      name: 'suburb'
    },
    {
      id: 9,
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
      id: 10,
      width: 3,
      variant: 'Input',
      touched: formik.touched.postcode,
      error: formik.errors.postcode,
      value: formik.values.postcode,
      label: 'Postcode',
      name: 'postcode'
    },
    {
      id: 11,
      width: 6,
      variant: 'Autocomplete',
      touched: formik.touched.sales_id,
      error: formik.errors.sales_id,
      value: formik.values.sales_id,
      label: 'Sales',
      name: 'sales_id',
      formik: formik,
      options: sales
    },
    {
      id: 12,
      width: 6,
      variant: 'Select',
      touched: formik.touched.source_id,
      error: formik.errors.source_id,
      value: formik.values.source_id,
      label: 'Source',
      name: 'source_id',
      options: sources
    },
    {
      id: 13,
      width: 12,
      variant: 'Input',
      touched: formik.touched.description,
      error: formik.errors.description,
      value: formik.values.description,
      label: 'Description',
      name: 'description'
    }
  ];

  return <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add Lead" formik={formik} formikFields={formikFields} />;
};

AddLeadForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default AddLeadForm;
