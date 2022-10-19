import { useCallback, useEffect, useMemo, useState } from 'react';

// Material UI
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Project Imports
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import EditableTable from 'components/tables/EditableTable';
import ToggleCell from 'components/tables/cells/ToggleCell';
import AddStoryForm from './forms/AddStoryForm';

const StoryOptions = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getStories();
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
        Header: 'Label',
        accessor: 'label'
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

    const result = await bpmAPI.updateStory(newData[rowIndex].id, newData[rowIndex]);
    if (result.data) {
      setData(newData);
    }
  };

  const onAddOption = (values) => {
    const newData = [...data, values];
    setData(newData);
  };

  return (
    <MainCard title="Stories" content={false}>
      <EditableTable columns={columns} data={data} updateMyData={updateMyData} />
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 0.5 }}>
        <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <AddStoryForm onFormSubmit={onAddOption} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </MainCard>
  );
};

export default StoryOptions;
