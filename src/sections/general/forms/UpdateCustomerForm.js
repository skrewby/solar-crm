import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Project Imports
import FormDialog from 'components/dialogs/FormDialog';
import { bpmAPI } from 'api/bpm/bpm-api';

const UpdateCustomerForm = ({ customer, openDialog, setOpenDialog, onFormSubmit }) => {
  const [customers, setCustomers] = useState([]);

  const getData = useCallback(async () => {
    setCustomers([]);

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
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    initialValues: {
      customer_id: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      customer_id: Yup.string()
    }),
    onSubmit: async (values, helpers) => {
      try {
        // eslint-disable-next-line no-unused-vars
        const form_values = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== null && v !== ''));
        onFormSubmit(form_values);
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
      // eslint-disable-next-line react/prop-types
      initialValue: customers.find((data) => data.id === customer.id),
      formik: formik,
      options: customers
    }
  ];

  return (
    <FormDialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      title="Change Customer"
      formik={formik}
      formikFields={formikFields}
    />
  );
};

UpdateCustomerForm.propTypes = {
  customer: PropTypes.any.isRequired,
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default UpdateCustomerForm;
