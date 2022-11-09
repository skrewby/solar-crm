import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { IconButton, Stack, TableContainer, Tooltip } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';

// Project Import
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';
import BasicTable from 'components/tables/BasicTable';
import AddServiceFileForm from './forms/AddServiceFileForm';

const ServiceFiles = ({ service, getData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState([]);
  // Item chosen when the delete item button is pressed
  const [selectedItem, setSelectedItem] = useState({});
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);

  const fetchFiles = useCallback(async () => {
    setFiles([]);

    try {
      const result = await bpmAPI.getServiceFiles(service.id);
      if (result.data) {
        setFiles(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [service.id]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const columns = useMemo(
    () => [
      {
        Header: 'File',
        accessor: 'file_name'
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        disableFilters: true,
        enableGlobalFilter: false,
        // eslint-disable-next-line
        Cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Delete file">
                {/* eslint-disable-next-line react/prop-types */}
                <IconButton
                  color="primary"
                  onClick={() => {
                    // eslint-disable-next-line react/prop-types
                    setSelectedItem(row.original);
                    setOpenDeleteItemDialog(true);
                  }}
                >
                  <DeleteTwoToneIcon color="error" />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    []
  );

  return (
    <>
      <MainCard
        title="Files"
        content={false}
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <FileUploadTwoToneIcon />
          </IconButton>
        }
      >
        <TableContainer>
          <BasicTable columns={columns} data={files} />
        </TableContainer>
      </MainCard>
      <AddServiceFileForm openDialog={openDialog} setOpenDialog={setOpenDialog} service_id={service.id} getData={getData} />
      <ConfirmDialog
        open={openDeleteItemDialog}
        onClose={() => setOpenDeleteItemDialog(false)}
        title="Delete File"
        description="Are you sure you want to delete this file?"
        onConfirm={async () => {
          // eslint-disable-next-line react/prop-types
          await bpmAPI.deleteServiceFile(service.id, selectedItem.id);
          getData();
          setOpenDeleteItemDialog(false);
        }}
      />
    </>
  );
};

ServiceFiles.propTypes = {
  getData: PropTypes.func,
  service: PropTypes.any
};

export default ServiceFiles;
