import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// material-ui
import InfoHeader from 'components/InfoHeader';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SolarPowerTwoToneIcon from '@mui/icons-material/SolarPowerTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';

// project import
import { bpmAPI } from 'api/bpm/bpm-api';
import { useParams } from 'react-router';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import LeadTimeline from 'sections/leads/LeadTimeline';
import LeadSummary from 'sections/leads/summary/LeadSummary';
import LeadSystem from 'sections/leads/system/LeadSystem';
import LeadLogs from 'sections/leads/logs/LeadLogs';

// ==============================|| TAB PANEL ||============================== //
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| LEAD PAGE ||============================== //
const Lead = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getLead(id);
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
      label: 'Leads',
      href: '/leads'
    }
  ];

  const getCustomerName = () => {
    if (!data.customer) {
      return 'Lead';
    }
    if (!data.customer.company_name && !data.customer.first_name && !data.customer.last_name) {
      return 'Lead';
    }
    if (data.customer.company_name) {
      return data.ref + ' ' + data.customer.company_name;
    } else if (!data.customer.first_name && data.customer.last_name) {
      return data.ref + ' ' + data.customer.last_name;
    }
    return `${data.ref} ${data.customer.first_name} ${data.customer.last_name}`;
  };

  return (
    <>
      <InfoHeader navigation={navigation} currentLocation="Details" title={getCustomerName()} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Summary" icon={<InfoTwoToneIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="System" icon={<SolarPowerTwoToneIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Finance" icon={<MonetizationOnTwoToneIcon />} iconPosition="start" {...a11yProps(2)} />
            <Tab label="Log" icon={<MessageTwoToneIcon />} iconPosition="start" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <LeadSummary data={data} getData={getData} setLead={setData} />
            </Grid>
            <Grid item xs={12} md={3}>
              {data.status && <LeadTimeline data={data} status={data.status ? data.status.id : 0} getData={getData} setLead={setData} />}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              {data.system && <LeadSystem lead={data} setLead={setData} />}
            </Grid>
            <Grid item xs={12} md={3}>
              {data.status && <LeadTimeline data={data} status={data.status ? data.status.id : 0} getData={getData} setLead={setData} />}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Typography variant="h6">Finance Under Construction</Typography>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              {data.system && <LeadLogs lead={data} />}
            </Grid>
            <Grid item xs={12} md={3}>
              {data.status && <LeadTimeline data={data} status={data.status ? data.status.id : 0} getData={getData} setLead={setData} />}
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};

export default Lead;
