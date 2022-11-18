import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Box, Grid, IconButton, InputAdornment, Stack, TableContainer, TextField, Tooltip, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddIcon from '@mui/icons-material/Add';

// Project Import
import MainCard from 'components/MainCard';
import EditableTable from 'components/tables/EditableTable';
import { bpmAPI } from 'api/bpm/bpm-api';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';
import AddLeadExtraForm from './forms/AddLeadExtraForm';

const LeadExtras = ({ lead, setLead }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [extras, setExtras] = useState(lead.extras);
  // Item chosen when the delete item button is pressed
  const [selectedItem, setSelectedItem] = useState({});
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);
  const [internalPrice, setInternalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isDiscount, setIsDiscount] = useState(true);

  const SellingPrice = () => {
    const [value, setValue] = useState(lead.finance.selling_price || 0);

    const onChange = (e) => {
      setValue(e.target?.value);
    };

    const onBlur = async (e) => {
      if (e.target?.value) {
        await bpmAPI.updateLead(lead.id, { selling_price: e.target?.value });
        const result = await bpmAPI.getLead(lead.id);
        result.data && setLead(result.data);
      }
    };

    return (
      <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ width: 120, '& .MuiOutlinedInput-input': { py: 0.75, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
      />
    );
  };

  const BasePrice = () => {
    const [value, setValue] = useState(lead.finance.base_price || 0);

    const onChange = (e) => {
      setValue(e.target?.value);
    };

    const onBlur = async (e) => {
      if (e.target?.value) {
        await bpmAPI.updateLead(lead.id, { base_price: e.target?.value });
        const result = await bpmAPI.getLead(lead.id);
        result.data && setLead(result.data);
      }
    };

    return (
      <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ width: 120, '& .MuiOutlinedInput-input': { py: 0.75, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
      />
    );
  };

  useEffect(() => {
    const extra_prices = extras.map((row) => Number(row.price));
    const extras_total = extra_prices.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const inPrice = Number(lead.finance.base_price) + extras_total;
    setInternalPrice(inPrice);

    const d = ((inPrice - Number(lead.finance.selling_price)) / Number(lead.finance.selling_price)) * 100;
    const dis = d.toFixed(2);
    if (isNaN(dis)) {
      setDiscount(0);
    } else {
      setDiscount(dis);
    }

    if (dis <= 0) {
      setIsDiscount(false);
      setDiscount(dis * -1);
    }
  }, [extras, lead]);

  const columns = useMemo(
    () => [
      {
        Header: 'Extra',
        accessor: 'label'
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
    const newData = extras.map((row, index) => {
      if (index === rowIndex) {
        return {
          // @ts-ignore
          ...extras[rowIndex],
          item_id: extras[rowIndex].id,
          [columnId]: value
        };
      }
      return row;
    });

    const res = await bpmAPI.updateLeadExtra(lead.id, newData[rowIndex]);
    res.data && setExtras(newData);
    const result = await bpmAPI.getLead(lead.id);
    result.data && setLead(result.data);
  };

  const onAddItem = async () => {
    const result = await bpmAPI.getLead(lead.id);
    result.data.extras && setExtras(result.data.extras);
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
                  Selling Price
                </Typography>
              </Grid>
              <Grid item>
                <SellingPrice />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  Base Price
                </Typography>
              </Grid>
              <Grid item>
                <BasePrice />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  Internal Price
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">{`$ ${internalPrice}`}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  Discount
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color={isDiscount ? 'error.light' : 'success.light'}>
                  {`${discount} %`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer>
          <EditableTable columns={columns} data={extras} updateMyData={updateMyData} />
        </TableContainer>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 0.5 }}>
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        </Stack>
      </MainCard>
      <AddLeadExtraForm onFormSubmit={onAddItem} openDialog={openDialog} setOpenDialog={setOpenDialog} id={lead.id} />
      <ConfirmDialog
        open={openDeleteItemDialog}
        onClose={() => setOpenDeleteItemDialog(false)}
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        onConfirm={async () => {
          // eslint-disable-next-line react/prop-types
          const res = await bpmAPI.deleteLeadExtra(lead.id, selectedItem.id);
          if (res.message === 'Item Deleted') {
            // eslint-disable-next-line react/prop-types
            const newData = extras.filter((item) => item.id !== selectedItem.id);
            setExtras(newData);
          }
          const result = await bpmAPI.getLead(lead.id);
          result.data && setLead(result.data);

          setOpenDeleteItemDialog(false);
        }}
      />
    </>
  );
};

LeadExtras.propTypes = {
  lead: PropTypes.any,
  setLead: PropTypes.any
};

export default LeadExtras;
