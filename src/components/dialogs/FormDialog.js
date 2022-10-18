import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Project Import
import { FormFields } from 'components/form/FormFields';

// ==============================|| FORM DIALOG ||============================== //

export default function FormDialog({ open, onClose, title, formik, formikFields, submitText = 'Submit' }) {
  const closeForm = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={closeForm}>
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{<FormFields formik={formik} fields={formikFields} width={12} />}</DialogContent>
        <DialogActions>
          <Button color="error" onClick={closeForm}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
            onClick={() => {
              formik.handleSubmit();
              onClose();
            }}
          >
            {submitText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

FormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  formik: PropTypes.any,
  formikFields: PropTypes.any,
  submitText: PropTypes.string
};
