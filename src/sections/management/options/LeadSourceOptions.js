import { useCallback, useEffect, useMemo, useState } from 'react';

// Material UI
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Project Imports
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import EditableTable from 'components/tables/EditableTable';
import ToggleCell from 'components/tables/cells/ToggleCell';

const LeadSourceOptions = () => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getLeadSources();
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
        Header: 'Name',
        accessor: 'label'
      },
      {
        Header: 'Reference',
        accessor: 'reference'
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

    const result = await bpmAPI.updateLeadSource(newData[rowIndex].id, newData[rowIndex]);
    if (result.data) {
      setData(newData);
    }
  };

  const addSource = () => {
    console.log('Add');
  };

  return (
    <MainCard title="Lead Sources" content={false}>
      <EditableTable columns={columns} data={data} updateMyData={updateMyData} />
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 0.5 }}>
        <IconButton justify="center" color="primary" onClick={addSource}>
          <AddIcon />
        </IconButton>
      </Stack>
    </MainCard>
  );
};

export default LeadSourceOptions;
