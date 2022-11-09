import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// Material UI
import { Pagination, Stack } from '@mui/material';

// Project Import
import { bpmAPI } from 'api/bpm/bpm-api';
import LogAdd from 'components/log/LogAdd';
import MainCard from 'components/MainCard';
import LogEntry from 'components/log/LogEntry';

const ServiceLogs = ({ service }) => {
  const [data, setData] = useState([]);
  // The log entries to display
  const [page, setPage] = useState([]);
  // The current page we're in
  const [pageNumber, setPageNumber] = useState(1);
  // How many pages are there
  const [pageCount, setPageCount] = useState(1);

  const pageSize = 5;

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getServiceLogs(service.id);
      if (result.data) {
        setData(result.data);
        setPage(result.data.slice(0, pageSize));
        setPageNumber(1);
        setPageCount(Math.ceil(result.data.length / pageSize));
      }
    } catch (err) {
      console.error(err);
    }
  }, [service.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const addLog = async (value) => {
    const res = await bpmAPI.addServiceLog(service.id, { msg: value, auto: false });
    if (res.data) {
      const newData = [{ status: service.status.label, status_colour: service.status.colour, ...res.data[0] }, ...data];
      setData(newData);
      setPageCount(Math.ceil(newData.length / pageSize));
      setPage(newData.slice(0, pageSize));
      setPageNumber(1);
    }
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setPage(data.slice((value - 1) * pageSize, (value - 1) * pageSize + pageSize));
  };

  return (
    <MainCard title="Logs">
      <Stack spacing={2}>
        <LogAdd onAdd={addLog} />
        {page.map((log) => {
          return <LogEntry key={log.id} log={log} />;
        })}
        <Stack direction="row" justifyContent="end">
          <Pagination variant="outlined" color="primary" count={pageCount} page={pageNumber} onChange={handlePageChange} />
        </Stack>
      </Stack>
    </MainCard>
  );
};

ServiceLogs.propTypes = {
  service: PropTypes.any.isRequired
};

export default ServiceLogs;
