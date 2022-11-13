import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Box, Grid, IconButton, Stack, TableContainer, Tooltip, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddIcon from '@mui/icons-material/Add';

// Project Import
import MainCard from 'components/MainCard';
import EditableTable from 'components/tables/EditableTable';
import { bpmAPI } from 'api/bpm/bpm-api';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';
import AddLeadSystemItemForm from './forms/AddLeadSystemItemForm';

const LeadSystem = ({ lead, setLead }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState(lead.system.items);
  // Item chosen when the delete item button is pressed
  const [selectedItem, setSelectedItem] = useState({});
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'Brand',
        accessor: 'brand'
      },
      {
        Header: 'Series',
        accessor: 'series'
      },
      {
        Header: 'Model',
        accessor: 'model'
      },
      {
        Header: 'Amount',
        accessor: 'amount'
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
    if (columnId === 'amount') {
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

      const res = await bpmAPI.updateLeadSystemItem(lead.id, newData[rowIndex]);
      res.data && setItems(newData);
      const result = await bpmAPI.getLead(lead.id);
      result.data && setLead(result.data);
    }
  };

  const onAddItem = async () => {
    const result = await bpmAPI.getLead(lead.id);
    result.data.system && setItems(result.data.system.items);
    result.data && setLead(result.data);
  };

  return (
    <>
      <MainCard title="Items" content={false} secondary={<Box sx={{ width: '1.5rem', height: '2.25rem' }} />}>
        <Grid sx={{ p: 2.5 }} container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  System Size
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">{`${lead.system.size} kw`}</Typography>
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
      <AddLeadSystemItemForm onFormSubmit={onAddItem} openDialog={openDialog} setOpenDialog={setOpenDialog} id={lead.id} />
      <ConfirmDialog
        open={openDeleteItemDialog}
        onClose={() => setOpenDeleteItemDialog(false)}
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        onConfirm={async () => {
          // eslint-disable-next-line react/prop-types
          const res = await bpmAPI.deleteLeadSystemItem(lead.id, selectedItem.id);
          if (res.message === 'Item Deleted') {
            // eslint-disable-next-line react/prop-types
            const newData = items.filter((item) => item.id !== selectedItem.id);
            setItems(newData);
          }
          const result = await bpmAPI.getLead(lead.id);
          result.data && setLead(result.data);

          setOpenDeleteItemDialog(false);
        }}
      />
    </>
  );
};

LeadSystem.propTypes = {
  lead: PropTypes.any,
  setLead: PropTypes.any
};

export default LeadSystem;
