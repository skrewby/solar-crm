import { useCallback, useEffect, useState } from 'react';

// material-ui
import InfoHeader from 'components/InfoHeader';

// project import
import { bpmAPI } from 'api/bpm/bpm-api';
import { useParams } from 'react-router';
import { Grid, Stack } from '@mui/material';
import CustomerSummary from 'sections/general/CustomerSummary';
import ServiceItems from 'sections/services/ServiceItems';
import ServiceTimeline from 'sections/services/ServiceTimeline';
import PropertyAddress from 'sections/general/PropertyAddress';
import ServiceLogs from 'sections/services/ServiceLogs';
import ServiceFiles from 'sections/services/ServiceFiles';

// ==============================|| SAMPLE PAGE ||============================== //

const Service = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getService(id);
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

  const onCustomerFormSubmitSuccess = () => {
    getData();
  };
  const onCustomerFormSubmit = async (values) => {
    const res = await bpmAPI.updateService(id, values);
    if (res.data) {
      getData();
    }
  };

  const onAddressFormSubmit = async (values) => {
    const res = await bpmAPI.updateService(data.id, values);
    if (res.data) {
      getData();
    }
  };

  const navigation = [
    {
      id: 1,
      label: 'Home',
      href: '/'
    },
    {
      id: 2,
      label: 'Services',
      href: '/services'
    }
  ];

  const getCustomerName = () => {
    if (!data.customer) {
      return 'Customer';
    }
    if (!data.customer.company_name && !data.customer.first_name && !data.customer.last_name) {
      return 'Customer';
    }
    if (data.customer.company_name) {
      return data.customer.company_name;
    } else if (!data.customer.first_name && data.customer.last_name) {
      return data.customer.last_name;
    }
    return `${data.customer.first_name} ${data.customer.last_name}`;
  };

  return (
    <>
      <InfoHeader navigation={navigation} currentLocation="Details" title={getCustomerName()} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            {data.customer && (
              <CustomerSummary
                customer={data.customer}
                onFormSubmit={onCustomerFormSubmit}
                onSubmitSuccess={onCustomerFormSubmitSuccess}
                details={[
                  {
                    id: 1,
                    label: 'First Name',
                    value: data.customer.first_name
                  },
                  {
                    id: 2,
                    label: 'Last Name',
                    value: data.customer.last_name
                  },
                  {
                    id: 3,
                    label: 'Company Name',
                    value: data.customer.company_name
                  },
                  {
                    id: 4,
                    label: 'Company ABN',
                    value: data.customer.company_abn
                  },
                  {
                    id: 5,
                    label: 'Email',
                    value: data.customer.email
                  },
                  {
                    id: 6,
                    label: 'Phone',
                    value: data.customer.phone
                  }
                ]}
              />
            )}
            {data.address && <PropertyAddress data={data} onFormSubmit={onAddressFormSubmit} />}
            {data.items && data.finance && <ServiceItems service={data} />}
            {data.id && <ServiceFiles service={data} getData={getData} />}
            {data.id && <ServiceLogs service={data} />}
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          {data.visit && <ServiceTimeline service={data} status={data.status ? data.status.id : 0} getData={getData} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Service;
