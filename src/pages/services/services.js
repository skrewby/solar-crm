import { useCallback, useEffect, useState } from 'react';

// Material UI
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AddCustomerForm from 'sections/customers/forms/AddCustomerForm';
import { bpmAPI } from 'api/bpm/bpm-api';
import ServicesTable from 'sections/services/ServicesTable';

// ==============================|| SAMPLE PAGE ||============================== //

const Services = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getServices();
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
        title="Services"
        content={false}
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        }
      >
        <ServicesTable data={data} />
      </MainCard>
      <AddCustomerForm onFormSubmit={onAddItem} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Services;
