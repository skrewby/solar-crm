import { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Chip, IconButton, Stack, Tooltip } from '@mui/material';
import ForwardTwoToneIcon from '@mui/icons-material/ForwardTwoTone';

// project import
import { useTheme } from '@mui/styles';
import DataTable from 'components/tables/DataTable';
import DateCell from 'components/tables/cells/DateCell';
import StatusCell from 'components/tables/cells/StatusCell';
import { SelectColumnFilter, SelectStatusFilter } from 'utils/react-table';

// ==============================|| SAMPLE PAGE ||============================== //

const ServicesTable = ({ data }) => {
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        disableSortBy: true
      },
      {
        Header: 'First Name',
        accessor: 'customer.first_name',
        disableSortBy: true
      },
      {
        Header: 'Last Name',
        accessor: 'customer.last_name',
        disableSortBy: true
      },
      {
        Header: 'Company Name',
        accessor: 'customer.company_name',
        disableSortBy: true
      },
      {
        Header: 'Company ABN',
        accessor: 'customer.company_abn',
        disableSortBy: true
      },
      {
        Header: 'Email',
        accessor: 'customer.email',
        disableSortBy: true
      },
      {
        Header: 'Phone',
        accessor: 'customer.phone',
        disableSortBy: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
        Filter: SelectStatusFilter,
        Cell: StatusCell
      },
      {
        Header: 'Visit',
        accessor: 'visit.date',
        Cell: DateCell
      },
      {
        Header: 'Paid',
        accessor: 'finance.status',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => {
          // eslint-disable-next-line react/prop-types
          if (row.values['finance.status'] === 'Paid') {
            return <Chip color="success" label="Paid" size="small" variant="light" />;
          } else {
            return <Chip color="error" label="Unpaid" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        disableFilters: true,
        enableGlobalFilter: false,
        // eslint-disable-next-line
        Cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Open service file">
                {/* eslint-disable-next-line react/prop-types */}
                <IconButton color="primary" href={`/services/${row.values.id}`} target="">
                  <ForwardTwoToneIcon color={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    [theme.palette.primary.main]
  );

  const tableInitialState = {
    hiddenColumns: ['id', 'customer.company_name', 'customer.company_abn', 'finance.status']
  };

  return <DataTable columns={columns} data={data} initialState={tableInitialState} />;
};

ServicesTable.propTypes = {
  data: PropTypes.array
};

export default ServicesTable;
