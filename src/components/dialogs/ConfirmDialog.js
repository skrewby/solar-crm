import PropTypes from 'prop-types';

// Material UI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, useMediaQuery, useTheme } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, description }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ConfirmDialog;
