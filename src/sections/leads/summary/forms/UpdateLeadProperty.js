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
  const [roofType, setRoofType] = useState([]);
  const [roofPitch, setRoofPitch] = useState([]);
  const [stories, setStories] = useState([]);

  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    setPhases([]);
    setExistingSystems([]);
    setRoofType([]);
    setRoofPitch([]);
    setStories([]);

    try {
      const phasesResult = await bpmAPI.getPhases();
      if (phasesResult.data) {
        setPhases(phasesResult.data);
      }

      const existingSystemResult = await bpmAPI.getExistingSystemOptions();
      if (existingSystemResult.data) {
        setExistingSystems(existingSystemResult.data);
      }

      const roofTypeResult = await bpmAPI.getRoofTypes();
      if (roofTypeResult.data) {
        setRoofType(roofTypeResult.data);
      }

      const roofPitchResult = await bpmAPI.getRoofPitches();
      if (roofPitchResult.data) {
        setRoofPitch(roofPitchResult.data);
      }

      const storiesResult = await bpmAPI.getStories();
      if (storiesResult.data) {
        setStories(storiesResult.data);
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
      roof_type_id: data.property.roof_type_id || '',
      roof_pitch_id: data.property.roof_pitch_id || '',
      story_id: data.property.stories_id || '',
      retailer: data.connection.retailer || '',
      distributor: data.connection.distributor || '',
      nmi: data.connection.nmi || '',
      meter: data.connection.meter || '',
      property_comment: data.property.comment || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      phase_id: Yup.string(),
      existing_system_id: Yup.string(),
      roof_type_id: Yup.string(),
      roof_pitch_id: Yup.string(),
      story_id: Yup.string(),
      retailer: Yup.string(),
      distributor: Yup.string(),
      nmi: Yup.string(),
      meter: Yup.string(),
      property_comment: Yup.string()
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
    },
    {
      id: 3,
      width: 6,
      variant: 'Select',
      touched: formik.touched.roof_type_id,
      error: formik.errors.roof_type_id,
      value: formik.values.roof_type_id,
      label: 'Roof Type',
      name: 'roof_type_id',
      options: roofType
    },
    {
      id: 4,
      width: 6,
      variant: 'Select',
      touched: formik.touched.roof_pitch_id,
      error: formik.errors.roof_pitch_id,
      value: formik.values.roof_pitch_id,
      label: 'Roof Pitch',
      name: 'roof_pitch_id',
      options: roofPitch
    },
    {
      id: 5,
      width: 6,
      variant: 'Select',
      touched: formik.touched.story_id,
      error: formik.errors.story_id,
      value: formik.values.story_id,
      label: 'Stories',
      name: 'story_id',
      options: stories
    },
    {
      id: 6,
      width: 6,
      variant: 'Input',
      touched: formik.touched.retailer,
      error: formik.errors.retailer,
      value: formik.values.retailer,
      label: 'Retailer',
      name: 'retailer'
    },
    {
      id: 7,
      width: 6,
      variant: 'Input',
      touched: formik.touched.distributor,
      error: formik.errors.distributor,
      value: formik.values.distributor,
      label: 'Distributor',
      name: 'distributor'
    },
    {
      id: 8,
      width: 6,
      variant: 'Input',
      touched: formik.touched.nmi,
      error: formik.errors.nmi,
      value: formik.values.nmi,
      label: 'NMI',
      name: 'nmi'
    },
    {
      id: 9,
      width: 6,
      variant: 'Input',
      touched: formik.touched.meter,
      error: formik.errors.meter,
      value: formik.values.meter,
      label: 'Meter Number',
      name: 'meter'
    },
    {
      id: 10,
      width: 6,
      variant: 'Input',
      touched: formik.touched.property_comment,
      error: formik.errors.property_comment,
      value: formik.values.property_comment,
      label: 'Comment',
      name: 'property_comment'
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
