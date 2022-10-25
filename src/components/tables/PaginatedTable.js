import PropTypes from 'prop-types';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped, updateMyData, initialState }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    updateMyData,
    initialState
  });

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
      <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => (
                <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
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

const PaginatedTable = ({ columns, data, striped, title, updateMyData, initialState }) => {
  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={data} striped={striped} updateMyData={updateMyData} initialState={initialState} />
      </ScrollX>
    </MainCard>
  );
};

PaginatedTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string,
  updateMyData: PropTypes.func,
  initialState: PropTypes.any
};

export default PaginatedTable;
