import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';
import { useCallback, useEffect, useState } from 'react';

const EditStockItemForm = ({ item, openDialog, setOpenDialog, onFormSubmit }) => {
  const dispatch = useDispatch();
  const [stockTypes, setStockTypes] = useState([]);

  const getData = useCallback(async () => {
    setStockTypes([]);

    try {
      const result = await bpmAPI.getStockTypes();
      if (result.data) {
        setStockTypes(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const submitForm = async (values) => {
    const res = await bpmAPI.updateStockItem(item.id, values);
    if (res.data) {
      onFormSubmit(res.data);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Item Updated',
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
      type_id: item.type_id || '',
      brand: item.brand || '',
      series: item.series || '',
      model: item.model || '',
      count: item.count || 0,
      datasheet: item.datasheet || '',
      warranty: item.warranty || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      type_id: Yup.string().required('Required'),
      brand: Yup.string().required('Required'),
      series: Yup.string(),
      model: Yup.string().required('Required'),
      count: Yup.number().required('Required'),
      datasheet: Yup.string(),
      warranty: Yup.string()
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
      variant: 'Select',
      touched: formik.touched.type_id,
      error: formik.errors.type_id,
      value: formik.values.type_id,
      label: 'Type',
      name: 'type_id',
      options: stockTypes
    },
    {
      id: 2,
      width: 6,
      variant: 'Input',
      touched: formik.touched.brand,
      error: formik.errors.brand,
      value: formik.values.brand,
      label: 'Brand',
      name: 'brand'
    },
    {
      id: 3,
      width: 6,
      variant: 'Input',
      touched: formik.touched.series,
      error: formik.errors.series,
      value: formik.values.series,
      label: 'Series',
      name: 'series'
    },
    {
      id: 4,
      width: 6,
      variant: 'Input',
      touched: formik.touched.model,
      error: formik.errors.model,
      value: formik.values.model,
      label: 'Model',
      name: 'model'
    },
    {
      id: 5,
      width: 6,
      variant: 'Input',
      touched: formik.touched.count,
      error: formik.errors.count,
      value: formik.values.count,
      label: 'Count',
      name: 'count'
    },
    {
      id: 6,
      width: 12,
      variant: 'Upload',
      touched: formik.touched.datasheet,
      error: formik.errors.datasheet,
      formik: formik,
      label: 'Update Datasheet',
      name: 'datasheet'
    },
    {
      id: 7,
      width: 12,
      variant: 'Upload',
      touched: formik.touched.warranty,
      error: formik.errors.warranty,
      formik: formik,
      label: 'Update Warranty',
      name: 'warranty'
    }
  ];

  return <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add Item" formik={formik} formikFields={formikFields} />;
};

EditStockItemForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  item: PropTypes.any
};

export default EditStockItemForm;
