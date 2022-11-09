import PropTypes from 'prop-types';
import React from 'react';

import { useMemo, useState } from 'react';

// material-ui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { useAsyncDebounce } from 'react-table';
import { matchSorter } from 'match-sorter';

// project import
import IconButton from 'components/@extended/IconButton';

// assets
import { CloseOutlined, LineOutlined, SearchOutlined } from '@ant-design/icons';
import { formatISO, isValid, parseISO, setHours, setMinutes } from 'date-fns';

export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter, ...other }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <OutlinedInput
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search ${count} records...`}
      id="start-adornment-email"
      startAdornment={<SearchOutlined />}
      {...other}
    />
  );
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func
};

export function DefaultColumnFilter({ column: { filterValue, Header, setFilter } }) {
  return (
    <TextField
      fullWidth
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={Header}
      size="small"
    />
  );
}

DefaultColumnFilter.propTypes = {
  column: PropTypes.object
};

export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || '');
      }}
      displayEmpty
      size="small"
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

SelectColumnFilter.propTypes = {
  column: PropTypes.object
};

export function SelectStatusFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const options = useMemo(() => {
    const options = new Set();
    const keys = new Set();
    preFilteredRows.forEach((row) => {
      if (!keys.has(row.values[id].id)) {
        options.add(row.values[id]);
        keys.add(row.values[id].id);
      }
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || '');
      }}
      displayEmpty
      size="small"
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

SelectStatusFilter.propTypes = {
  column: PropTypes.object
};

export function SelectBooleanColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <Select
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || '');
      }}
      displayEmpty
      size="small"
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value={true}>Enabled</MenuItem>
    </Select>
  );
}

SelectBooleanColumnFilter.propTypes = {
  column: PropTypes.object
};

export function DateColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 168, maxWidth: 250 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          value={filterValue || ''}
          onChange={(e) => {
            setFilter(e || '');
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Stack>
  );
}

DateColumnFilter.propTypes = {
  column: PropTypes.object
};

export function DateRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
  const [expanded, setExpanded] = useState(false);
  const { palette } = useTheme();

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : formatISO(new Date(0));
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : formatISO(new Date(0));

    preFilteredRows.forEach((row) => {
      const rowDate = row.values[id];

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => {
        setExpanded((prevState) => !prevState);
      }}
    >
      <AccordionSummary sx={{ '&.MuiAccordionSummary-root': { backgroundColor: palette.grey[50], minHeight: 30 } }}></AccordionSummary>
      <AccordionDetails>
        <Stack alignItems="center" spacing={1} sx={{ minWidth: 160, maxWidth: 160 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              minDate={parseISO(min)}
              inputFormat="dd/MM/yyyy"
              value={filterValue[0] || ''}
              onChange={(e) => {
                const val = isValid(e) ? formatISO(e) : null;
                setFilter((old = []) => [val ? val : undefined, old[1]]);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography>TO</Typography>
            <DatePicker
              maxDate={parseISO(max)}
              inputFormat="dd/MM/yyyy"
              value={filterValue[1]?.slice(0, 10) || ''}
              onChange={(e) => {
                const val = isValid(e) ? formatISO(e) : null;
                setFilter((old = []) => [old[0], val ? val : undefined]);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

DateRangeColumnFilter.propTypes = {
  column: PropTypes.object
};

export function SliderColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
      <Slider
        value={filterValue || min}
        min={min}
        max={max}
        step={1}
        onChange={(event, newValue) => {
          setFilter(newValue);
        }}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <Tooltip title="Reset">
        <IconButton size="small" color="error" onClick={() => setFilter(undefined)}>
          <CloseOutlined />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

SliderColumnFilter.propTypes = {
  column: PropTypes.object
};

export function NumberRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 168, maxWidth: 250 }}>
      <TextField
        fullWidth
        value={filterValue[0] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
        }}
        placeholder={`Min (${min})`}
        size="small"
      />
      <LineOutlined />
      <TextField
        fullWidth
        value={filterValue[1] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined]);
        }}
        placeholder={`Max (${max})`}
        size="small"
      />
    </Stack>
  );
}

NumberRangeColumnFilter.propTypes = {
  column: PropTypes.object
};

// @ts-ignore
function fuzzyTextFilterFn(rows, id, filterValue) {
  // @ts-ignore
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

export const renderFilterTypes = () => ({
  fuzzyText: fuzzyTextFilterFn,
  text: (rows, id, filterValue) => {
    rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true;
    });
  }
});

// @ts-ignore
export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

export function useControlledState(state) {
  return useMemo(() => {
    if (state.groupBy.length) {
      return {
        ...state,
        hiddenColumns: [...state.hiddenColumns, ...state.groupBy].filter((d, i, all) => all.indexOf(d) === i)
      };
    }
    return state;
  }, [state]);
}

export function roundedMedian(leafValues) {
  let min = leafValues[0] || 0;
  let max = leafValues[0] || 0;

  leafValues.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

export function optionsFilterFunction(rows, id, filterValue) {
  if (!filterValue) {
    return rows;
  }

  return rows.filter((row) => {
    const row_value = row.values[id];
    return row_value.id === filterValue.id;
  });
}

export function paidFilterFunction(rows, id, filterValue) {
  if (!filterValue) {
    return rows;
  }

  return rows.filter((row) => {
    const row_value = row.values[id];
    return row_value === filterValue;
  });
}

export function dateBetweenFilterFunction(rows, id, filterValues) {
  const sd = filterValues[0] ? parseISO(filterValues[0].split('T')[0]) : undefined;
  const ed = filterValues[1] ? parseISO(filterValues[1].split('T')[0]) : undefined;

  if (ed || sd) {
    return rows.filter((r) => {
      if (r.values[id]) {
        const cellDate = setMinutes(setHours(parseISO(r.values[id]), 0), 0);

        if (ed && sd) {
          return cellDate >= sd && cellDate <= ed;
        } else if (sd) {
          return cellDate >= sd;
        } else if (ed) {
          return cellDate <= ed;
        }
      }
    });
  } else {
    return rows;
  }
}
