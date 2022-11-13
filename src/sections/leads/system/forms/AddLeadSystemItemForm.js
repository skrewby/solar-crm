import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const AddLeadSystemItemForm = ({ id, openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();
  const [stock, setStock] = useState([]);

  const getData = useCallback(async () => {
    setStock([]);

    try {
      const result = await bpmAPI.getStock();
      if (result.data) {
        const getLabel = (item) => {
          if (item.series) {
            return `${item.brand} - ${item.series} - ${item.model}`;
          } else {
            return `${item.brand} - ${item.model}`;
          }
        };
        const stockData = result.data.map((item) => {
          return {
            id: item.id,
            label: getLabel(item)
          };
        });
        setStock(stockData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const submitForm = async (values) => {
    const res = await bpmAPI.addLeadSystemItem(id, values);
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
      item_id: '',
      amount: 0,
      submit: null
    },
    validationSchema: Yup.object().shape({
      item_id: Yup.string().required('Required'),
      amount: Yup.number().positive('Must be positive').required('Required')
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
      width: 8,
      variant: 'Autocomplete',
      touched: formik.touched.item_id,
      error: formik.errors.item_id,
      label: 'Item',
      name: 'item_id',
      formik: formik,
      options: stock
    },
    {
      id: 2,
      width: 4,
      variant: 'Input',
      touched: formik.touched.amount,
      error: formik.errors.amount,
      value: formik.values.amount,
      label: 'Amount',
      name: 'amount'
    }
  ];

  return <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add Item" formik={formik} formikFields={formikFields} />;
};

AddLeadSystemItemForm.propTypes = {
  id: PropTypes.string,
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default AddLeadSystemItemForm;
