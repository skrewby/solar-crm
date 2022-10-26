import { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { IconButton, Stack, Tooltip } from '@mui/material';
import ForwardTwoToneIcon from '@mui/icons-material/ForwardTwoTone';

// project import
import { useTheme } from '@mui/styles';
import DataTable from 'components/tables/DataTable';

// ==============================|| SAMPLE PAGE ||============================== //

const CustomersTable = ({ data }) => {
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
        accessor: 'first_name',
        disableSortBy: true
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
        disableSortBy: true
      },
      {
        Header: 'Company Name',
        accessor: 'company_name',
        disableSortBy: true
      },
      {
        Header: 'Company ABN',
        accessor: 'company_abn',
        disableSortBy: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableSortBy: true
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        disableSortBy: true,
        filter: 'fuzzyText'
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
              <Tooltip title="Open customer file">
                {/* eslint-disable-next-line react/prop-types */}
                <IconButton color="primary" href={`/customers/${row.values.id}`} target="">
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
    hiddenColumns: ['id']
  };

  return <DataTable columns={columns} data={data} initialState={tableInitialState} />;
};

CustomersTable.propTypes = {
  data: PropTypes.array
};

export default CustomersTable;
