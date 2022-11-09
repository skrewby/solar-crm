import PropTypes from 'prop-types';

// Material UI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import { UploadField } from 'components/form/fields/UploadField';

const UploadDialog = ({ open, onClose, title, multiple = true, onUpload, onDelete }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={onClose}>
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <UploadField allowMultiple={multiple} name="Upload Dialog" onUpload={onUpload} onDelete={onDelete} label="Upload Files" />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onClose}>
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

UploadDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  multiple: PropTypes.bool,
  title: PropTypes.string
};

export default UploadDialog;
