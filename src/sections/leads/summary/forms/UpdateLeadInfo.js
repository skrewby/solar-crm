import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const UpdateLeadInfo = ({ data, openDialog, setOpenDialog, onFormSubmit }) => {
  const [sales, setSales] = useState([]);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    setSales([]);

    try {
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
    const res = await bpmAPI.updateLead(data.id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Lead Updated',
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
      description: data.description || '',
      sales_id: data.sales.id || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      description: Yup.string(),
      sales_id: Yup.string()
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
      width: 12,
      variant: 'Input',
      touched: formik.touched.description,
      error: formik.errors.description,
      value: formik.values.description,
      label: 'Description',
      name: 'description'
    },
    {
      id: 2,
      width: 12,
      variant: 'Autocomplete',
      touched: formik.touched.sales_id,
      error: formik.errors.sales_id,
      value: formik.values.sales_id,
      initialValue: data.sales,
      label: 'Sales',
      name: 'sales_id',
      formik: formik,
      options: sales
    },
    {
      id: 3,
      width: 12,
      variant: 'Upload',
      touched: formik.touched.panel_design,
      error: formik.errors.panel_design,
      formik: formik,
      label: 'Update Panel Design',
      name: 'panel_design'
    },
    {
      id: 4,
      width: 12,
      variant: 'Upload',
      touched: formik.touched.proposal,
      error: formik.errors.proposal,
      formik: formik,
      label: 'Update Proposal',
      name: 'proposal'
    }
  ];

  return (
    <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Update Lead" formik={formik} formikFields={formikFields} />
  );
};

UpdateLeadInfo.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  data: PropTypes.any
};

export default UpdateLeadInfo;
