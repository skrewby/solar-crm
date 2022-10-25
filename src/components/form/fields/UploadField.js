import { useState } from 'react';
import PropTypes from 'prop-types';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// FilePond plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Material UI
import { FormHelperText, InputLabel, Stack } from '@mui/material';

// Project Import
import { bpmServer } from 'api/bpm/bpm-server';
import { bpmAPI } from 'api/bpm/bpm-api';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const UploadField = ({ label, name, onUpload, onDelete, touched, error, formik, allowMultiple = false }) => {
  const [files, setFiles] = useState([]);
  const onFileUpload = async (error, file) => {
    if (error) {
      console.log(error);
      return;
    }

    const response = await bpmAPI.addFile({
      file_name: file.filename,
      file_ext: file.fileExtension,
      file_path: file.serverId,
      pond_id: file.id
    });

    if (response.data) {
      if (formik) {
        formik.setFieldValue(name, response.data.id);
      }
    }

    if (onUpload) {
      try {
        onUpload(file, response.id);
      } catch (error) {
        console.log('Error on provided upload function');
        console.log(error.message);
      }
    }
  };

  const onFileDelete = async (error, file) => {
    if (error) {
      console.log(error);
      return;
    }
    // Save the id because it will disappear after deleting the file
    const file_id = file.id;

    await bpmAPI.deleteFilepondFile(file.id);

    if (formik) {
      formik.resetForm({ values: { ...formik.values, name: '' } });
    }

    if (onDelete) {
      try {
        onDelete(file_id);
      } catch (error) {
        console.log('Error on provided delete function');
        console.log(error.message);
      }
    }
  };

  return (
    <Stack spacing={1.25}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        data-max-file-size="10MB"
        allowMultiple={allowMultiple}
        labelIdle='Drop your files or <span class="filepond--label-action">Browse</span>'
        name="files"
        server={bpmServer.uploadURL()}
        onprocessfile={onFileUpload}
        onremovefile={onFileDelete}
        credits={false}
      />
      {touched && error && (
        <FormHelperText error id={`${name}-helper`}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};

UploadField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  touched: PropTypes.bool,
  error: PropTypes.string,
  formik: PropTypes.any,
  allowMultiple: PropTypes.bool
};
