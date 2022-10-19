import { useCallback, useEffect, useMemo, useState } from 'react';

// Project Imports
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import BasicTable from 'components/tables/BasicTable';
import ToggleCell from 'components/tables/cells/ToggleCell';

const RoleOptions = () => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getRoles();
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
        Header: 'Status',
        accessor: 'active',
        // eslint-disable-next-line
        Cell: ToggleCell
      }
    ],
    []
  );

  const updateMyData = async (rowIndex, columnId, value) => {
    const row = data[rowIndex];
    const result = await bpmAPI.updateRole(row.id, { active: value });
    if (result.data) {
      const newData = data.map((_row) => {
        if (_row.id === result.data.id) {
          return result.data;
        }
        return _row;
      });
      setData(newData);
    }
  };

  return (
    <MainCard title="Roles" content={false}>
      <BasicTable columns={columns} data={data} updateMyData={updateMyData} />
    </MainCard>
  );
};

export default RoleOptions;
