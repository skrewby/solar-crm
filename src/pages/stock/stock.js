import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project import
import MainCard from 'components/MainCard';
import PaginatedTable from 'components/tables/PaginatedTable';
import ToggleCell from 'components/tables/cells/ToggleCell';
import { bpmAPI } from 'api/bpm/bpm-api';
import AddStockItemForm from 'sections/stock/forms/AddStockItemForm';

// ==============================|| SAMPLE PAGE ||============================== //

const Stock = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getStock();
      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type'
      },
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
        Header: 'Count',
        accessor: 'count'
      },
      {
        Header: 'Status',
        accessor: 'active',
        // eslint-disable-next-line
        Cell: ToggleCell
      }
    ],
    []
  );

  const onAddStockItem = (values) => {
    const newData = [...data, values];
    setData(newData);
  };

  const updateMyData = async (rowIndex, columnId, value) => {
    const newData = data.map((row, index) => {
      if (index === rowIndex) {
        return {
          // @ts-ignore
          ...data[rowIndex],
          [columnId]: value
        };
      }
      return row;
    });

    try {
      const result = await bpmAPI.updateStockItem(newData[rowIndex].id, newData[rowIndex]);
      if (result.data) {
        setData(newData);
      }
    } catch (e) {
      console.error(e.message.message);
    }
  };

  return (
    <MainCard
      title="Items"
      content={false}
      secondary={
        <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
          <AddIcon />
        </IconButton>
      }
    >
      <PaginatedTable columns={columns} data={data} updateMyData={updateMyData} />
      <AddStockItemForm onFormSubmit={onAddStockItem} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </MainCard>
  );
};

export default Stock;
