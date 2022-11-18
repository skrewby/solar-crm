import { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { IconButton, Stack, Tooltip } from '@mui/material';
import ForwardTwoToneIcon from '@mui/icons-material/ForwardTwoTone';

// project import
import { useTheme } from '@mui/styles';
import DataTable from 'components/tables/DataTable';
import StatusCell from 'components/tables/cells/StatusCell';
import { optionsFilterFunction, SelectColumnFilter, SelectStatusFilter } from 'utils/react-table';

// ==============================|| SERVICES TABLE ||============================== //

const LeadsTable = ({ data }) => {
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        disableSortBy: true
      },
      {
        Header: 'Reference',
        accessor: 'ref',
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
        Header: 'Address',
        accessor: 'address.full',
        disableSortBy: true
      },
      {
        Header: 'Sales',
        accessor: 'sales.label',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
        enableGlobalFilter: false,
        Filter: SelectStatusFilter,
        filter: optionsFilterFunction,
        Cell: StatusCell
      },
      {
        Header: 'Source',
        accessor: 'source.label',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'System Size',
        accessor: 'system.size',
        disableSortBy: false
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
              <Tooltip title="Go to Lead">
                {/* eslint-disable-next-line react/prop-types */}
                <IconButton color="primary" href={`/leads/${row.values.id}`} target="">
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
    hiddenColumns: ['id', 'customer.company_name', 'customer.company_abn', 'system.size', 'source.label', 'customer.email']
  };

  return <DataTable columns={columns} data={data} initialState={tableInitialState} />;
};

LeadsTable.propTypes = {
  data: PropTypes.array
};

export default LeadsTable;
