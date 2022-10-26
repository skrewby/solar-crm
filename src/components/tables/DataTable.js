import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { HeaderSort, HidingSelect, TablePagination } from 'components/third-party/ReactTable';
import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, updateMyData, initialState }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

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
    state: { pageIndex, pageSize, hiddenColumns, globalFilter },
    setHiddenColumns,
    allColumns,
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      // @ts-ignore
      initialState: { ...initialState, pageIndex: 0, pageSize: 25 },
      autoResetPage: false,
      autoResetFilters: false,
      filterTypes,
      defaultColumn
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          size="small"
        />
        <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: 0, pb: 0 }}>
          <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
        </Stack>
      </Stack>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                  <HeaderSort column={column} sort />
                </TableCell>
              ))}
            </TableRow>
          ))}
          {headerGroups.map((group, i) => (
            <TableRow key={i} {...group.getHeaderGroupProps()}>
              {group.headers.map((column, index) => (
                <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                  {column.canFilter ? column.render('Filter') : null}
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
    </Stack>
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

const DataTable = ({ columns, data, title, updateMyData, initialState }) => {
  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={data} updateMyData={updateMyData} initialState={initialState} />
      </ScrollX>
    </MainCard>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.any,
  title: PropTypes.string,
  updateMyData: PropTypes.func,
  initialState: PropTypes.any
};

export default DataTable;
