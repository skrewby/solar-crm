import PropTypes from 'prop-types';

// Material UI
import { Stack } from '@mui/material';

// Project Import
import CustomerSummary from 'sections/leads/CustomerSummary';
import PropertyAddress from 'sections/general/PropertyAddress';
import LeadInformation from 'sections/leads/summary/LeadInformation';
import { bpmAPI } from 'api/bpm/bpm-api';

const LeadSummary = ({ data, getData }) => {
  const onCustomerFormSubmit = async () => {
    getData();
  };

  const onAddressFormSubmit = async (values) => {
    const res = await bpmAPI.updateLead(data.id, values);
    if (res.data) {
      getData();
    }
  };

  return (
    <Stack spacing={2}>
      {data.customer && (
        <CustomerSummary
          data={data}
          onFormSubmit={onCustomerFormSubmit}
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
      {data.sales && data.source && <LeadInformation lead={data} />}
    </Stack>
  );
};

LeadSummary.propTypes = {
  data: PropTypes.any,
  getData: PropTypes.func
};

export default LeadSummary;
