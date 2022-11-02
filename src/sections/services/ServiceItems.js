import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { IconButton, Stack } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddIcon from '@mui/icons-material/Add';

// Project Import
import MainCard from 'components/MainCard';
import EditableTable from 'components/tables/EditableTable';
import AddServiceItemForm from './forms/AddServiceItemForm';
import { bpmAPI } from 'api/bpm/bpm-api';

const ServiceItems = ({ service, getData }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Price',
        accessor: 'price'
      }
    ],
    []
  );

  const updateMyData = async (rowIndex, columnId, value) => {
    // Add Item ID
    const getUpdateBody = () => {
      if (columnId === 'description') {
        return {
          description: value
        };
      } else if (columnId === 'price') {
        return {
          price: value
        };
      }
    };
    await bpmAPI.updateServiceItem(service.id, getUpdateBody());
    getData();
  };

  const onAddItem = () => {
    getData();
  };

  return (
    <>
      <MainCard
        title="Items"
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <EditTwoToneIcon />
          </IconButton>
        }
      >
        <EditableTable columns={columns} data={service.items} updateMyData={updateMyData} />
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 0.5 }}>
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        </Stack>
      </MainCard>
      <AddServiceItemForm onFormSubmit={onAddItem} openDialog={openDialog} setOpenDialog={setOpenDialog} service_id={service.id} />
    </>
  );
};

ServiceItems.propTypes = {
  getData: PropTypes.func,
  service: PropTypes.any
};

export default ServiceItems;
