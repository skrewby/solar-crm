import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Box, Checkbox, Grid, IconButton, Stack, TableContainer, Tooltip, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddIcon from '@mui/icons-material/Add';

// Project Import
import MainCard from 'components/MainCard';
import EditableTable from 'components/tables/EditableTable';
import AddServiceItemForm from './forms/AddServiceItemForm';
import { bpmAPI } from 'api/bpm/bpm-api';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';

const ServiceItems = ({ service }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState(service.items);
  // Item chosen when the delete item button is pressed
  const [selectedItem, setSelectedItem] = useState({});
  const [paid, setPaid] = useState(service.finance.paid);
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Price',
        accessor: 'price'
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
              <Tooltip title="Delete item">
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

  const updateMyData = async (rowIndex, columnId, value) => {
    const newData = items.map((row, index) => {
      if (index === rowIndex) {
        return {
          // @ts-ignore
          ...items[rowIndex],
          item_id: items[rowIndex].id,
          [columnId]: value
        };
      }
      return row;
    });

    const res = await bpmAPI.updateServiceItem(service.id, newData[rowIndex]);
    res.data && setItems(newData);
  };

  const onAddItem = (data) => {
    data && setItems([...items, data]);
  };

  const getTotalPrice = () => {
    return items.map((item) => Number(item.price)).reduce((total, price) => total + price, 0);
  };

  const handlePaymentToggle = async (event) => {
    setPaid(event.target.checked);
    await bpmAPI.updateLead(service.id, { paid: event.target.checked });
  };

  return (
    <>
      <MainCard title="Items" content={false} secondary={<Box sx={{ width: '1.5rem', height: '2.25rem' }} />}>
        <Grid sx={{ p: 2.5 }} container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  Total Cost
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">{`$${getTotalPrice()}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  Paid
                </Typography>
              </Grid>
              <Grid item>
                <Checkbox checked={paid} onChange={handlePaymentToggle} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer>
          <EditableTable columns={columns} data={items} updateMyData={updateMyData} />
        </TableContainer>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 0.5 }}>
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        </Stack>
      </MainCard>
      <AddServiceItemForm onFormSubmit={onAddItem} openDialog={openDialog} setOpenDialog={setOpenDialog} service_id={service.id} />
      <ConfirmDialog
        open={openDeleteItemDialog}
        onClose={() => setOpenDeleteItemDialog(false)}
        title="Delete Item"
        description="Are you sure you want to delete this service item?"
        onConfirm={async () => {
          // eslint-disable-next-line react/prop-types
          const res = await bpmAPI.deleteServiceItem(service.id, selectedItem.id);
          if (res.message === 'Item Deleted') {
            // eslint-disable-next-line react/prop-types
            const newData = items.filter((item) => item.id !== selectedItem.id);

            setItems(newData);
          }
          setOpenDeleteItemDialog(false);
        }}
      />
    </>
  );
};

ServiceItems.propTypes = {
  service: PropTypes.any
};

export default ServiceItems;
