import { useCallback, useEffect, useState } from 'react';

// material-ui
import InfoHeader from 'components/InfoHeader';

// project import
import { bpmAPI } from 'api/bpm/bpm-api';
import { useParams } from 'react-router';
import CustomerDetails from 'sections/customers/CustomerDetails';
import CustomerLogs from 'sections/customers/CustomerLogs';
import { Stack } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

const Customer = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getCustomer(id);
      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const navigation = [
    {
      id: 1,
      label: 'Home',
      href: '/'
    },
    {
      id: 2,
      label: 'Customers',
      href: '/customers'
    }
  ];

  const getCustomerName = () => {
    if (!data.company_name && !data.first_name && !data.last_name) {
      return 'Customer';
    }
    if (data.company_name) {
      return data.company_name;
    } else if (!data.first_name && data.last_name) {
      return data.last_name;
    }
    return `${data.first_name} ${data.last_name}`;
  };

  return (
    <>
      <InfoHeader navigation={navigation} currentLocation="Details" title={getCustomerName()} />
      <Stack spacing={2}>
        <CustomerDetails
          data={data}
          setData={setData}
          details={[
            {
              id: 1,
              label: 'First Name',
              value: data.first_name
            },
            {
              id: 2,
              label: 'Last Name',
              value: data.last_name
            },
            {
              id: 3,
              label: 'Company Name',
              value: data.company_name
            },
            {
              id: 4,
              label: 'Company ABN',
              value: data.company_abn
            },
            {
              id: 5,
              label: 'Email',
              value: data.email
            },
            {
              id: 6,
              label: 'Phone',
              value: data.phone
            }
          ]}
        />
        <CustomerLogs id={id} />
      </Stack>
    </>
  );
};

export default Customer;
