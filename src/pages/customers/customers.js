import { useCallback, useEffect, useState } from 'react';

// Material UI
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import CustomersTable from 'sections/customers/CustomersTable';
import AddCustomerForm from 'sections/customers/forms/AddCustomerForm';
import { bpmAPI } from 'api/bpm/bpm-api';

// ==============================|| SAMPLE PAGE ||============================== //

const Customers = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getCustomers();
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

  const onAddItem = (values) => {
    const newData = [...data, values];
    setData(newData);
  };

  return (
    <>
      <MainCard
        title="Customers"
        content={false}
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        }
      >
        <CustomersTable data={data} />
      </MainCard>
      <AddCustomerForm onFormSubmit={onAddItem} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Customers;
