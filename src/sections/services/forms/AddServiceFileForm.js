import PropTypes from 'prop-types';

// Project Imports
import { bpmAPI } from 'api/bpm/bpm-api';
import UploadDialog from 'components/dialogs/UploadDialog';

const AddServiceFileForm = ({ openDialog, setOpenDialog, service_id, getData }) => {
  const onUpload = async (file) => {
    await bpmAPI.addServiceFile(service_id, { file_id: file.id });
  };

  return (
    <UploadDialog
      open={openDialog}
      onClose={() => {
        getData();
        setOpenDialog(false);
      }}
      title="Upload File"
      onUpload={onUpload}
    />
  );
};

AddServiceFileForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  getData: PropTypes.func,
  service_id: PropTypes.string
};

export default AddServiceFileForm;
