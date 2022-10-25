import PropTypes from 'prop-types';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useFilters, usePagination, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, updateMyData, initialState }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      // @ts-ignore
      initialState: { ...initialState, pageIndex: 0, pageSize: 25 },
      autoResetPage: false
    },
    useFilters,
    usePagination
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}

        <TableRow>
          <TableCell sx={{ p: 1 }} colSpan={columns.length - initialState.hiddenColumns.length}>
            <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  striped: PropTypes.bool,
  updateMyData: PropTypes.func,
  initialState: PropTypes.any
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const PaginatedTable = ({ columns, data, title, updateMyData, initialState }) => {
  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={data} updateMyData={updateMyData} initialState={initialState} />
      </ScrollX>
    </MainCard>
  );
};

PaginatedTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.any,
  title: PropTypes.string,
  updateMyData: PropTypes.func,
  initialState: PropTypes.any
};

export default PaginatedTable;
