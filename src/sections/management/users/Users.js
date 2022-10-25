import { useCallback, useEffect, useMemo, useState } from 'react';

// Material UI
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Project Imports
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import EditableTable from 'components/tables/EditableTable';
import ToggleCell from 'components/tables/cells/ToggleCell';
import AddUserForm from './forms/AddUserForm';
import MultiAutocompleteCell from 'components/tables/cells/MultiAutocompleteCell';

const Users = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getUsers();
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
        accessor: 'username'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Contact',
        accessor: 'phone'
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: MultiAutocompleteCell
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

    try {
      const result = await bpmAPI.updateUser(newData[rowIndex].id, newData[rowIndex]);
      const role_result = await bpmAPI.setUserRoles(newData[rowIndex].id, { roles: newData[rowIndex].roles });
      if (result.data && role_result.data) {
        setData(newData);
      }
    } catch (e) {
      console.error(e.message.message);
    }
  };

  const onAddOption = (values) => {
    const newData = [...data, values];
    setData(newData);
  };

  return (
    <MainCard title="Users" content={false}>
      <EditableTable columns={columns} data={data} updateMyData={updateMyData} />
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 0.5 }}>
        <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <AddUserForm onFormSubmit={onAddOption} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </MainCard>
  );
};

export default Users;
