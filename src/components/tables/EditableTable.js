import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// third-party
import { useTable, useFilters } from 'react-table';

// project import
import ScrollX from 'components/ScrollX';

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target?.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
    />
  );
};

EditableCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object,
  column: PropTypes.object,
  updateMyData: PropTypes.func
};

const defaultColumn = {
  Cell: EditableCell
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, updateMyData, skipPageReset }) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // @ts-ignore
      autoResetPage: !skipPageReset,
      updateMyData
    },
    useFilters
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <TableCell key={index} {...cell.getCellProps()}>
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
  updateMyData: PropTypes.func,
  skipPageReset: PropTypes.bool
};

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ columns, data, updateMyData }) => {
  const [update, setUpdate] = useState(false);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const onUpdate = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    updateMyData(rowIndex, columnId, value);
    setUpdate(true);
  };

  useEffect(() => {
    setSkipPageReset(false);
    setUpdate(false);
  }, [update]);

  return (
    <ScrollX>
      <ReactTable columns={columns} data={data} updateMyData={onUpdate} skipPageReset={skipPageReset} />
    </ScrollX>
  );
};

EditableTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  updateMyData: PropTypes.func
};

export default EditableTable;
