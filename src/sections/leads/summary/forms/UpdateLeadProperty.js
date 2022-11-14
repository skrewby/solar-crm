import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import { openSnackbar } from 'store/reducers/snackbar';
import FormDialog from 'components/dialogs/FormDialog';

const UpdateLeadProperty = ({ data, openDialog, setOpenDialog, onFormSubmit }) => {
  const [phases, setPhases] = useState([]);
  const [existingSystems, setExistingSystems] = useState([]);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    setPhases([]);

    try {
      const phasesResult = await bpmAPI.getPhases();
      if (phasesResult.data) {
        setPhases(phasesResult.data);
      }

      const existingSystemResult = await bpmAPI.getExistingSystemOptions();
      if (existingSystemResult.data) {
        setExistingSystems(existingSystemResult.data);
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
      phase_id: data.property.phase_id || '',
      existing_system_id: data.property.existing_system_id || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      phase_id: Yup.string(),
      existing_system_id: Yup.string()
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
      variant: 'Select',
      touched: formik.touched.phase_id,
      error: formik.errors.phase_id,
      value: formik.values.phase_id,
      label: 'Phases',
      name: 'phase_id',
      options: phases
    },
    {
      id: 2,
      width: 6,
      variant: 'Select',
      touched: formik.touched.existing_system_id,
      error: formik.errors.existing_system_id,
      value: formik.values.existing_system_id,
      label: 'Existing System',
      name: 'existing_system_id',
      options: existingSystems
    }
  ];

  return (
    <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} title="Update Lead" formik={formik} formikFields={formikFields} />
  );
};

UpdateLeadProperty.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func,
  data: PropTypes.any
};

export default UpdateLeadProperty;
