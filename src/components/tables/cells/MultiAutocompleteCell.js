import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Material UI
const { Autocomplete, TextField } = require('@mui/material');

const MultiAutocompleteCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [value, setValue] = useState(initialValue);
  const options = [
    {
      id: 'd89476ad-21e3-4c7c-ba66-02c64495f6bf',
      label: 'System Administrator',
      active: true
    },
    {
      id: '3050da36-c2cc-410f-ac17-e9ac88279deb',
      label: 'General Manager',
      active: true
    },
    {
      id: '7426b3f5-d0b5-4ad0-9fa4-140e7f680c99',
      label: 'Operations Manager',
      active: true
    },
    {
      id: 'a51b8e34-7cb7-4ca0-8042-51904a8acaea',
      label: 'Administration',
      active: true
    },
    {
      id: '2ae72405-c5b2-488b-9136-93f655875a86',
      label: 'Warehouse',
      active: true
    },
    {
      id: '1a4dee4f-36c3-49c6-9905-e05570c16b81',
      label: 'Operations',
      active: true
    },
    {
      id: 'cb7ac100-48c1-4064-9456-3e397310a1df',
      label: 'Services',
      active: true
    },
    {
      id: '531bdf1e-62e1-4cbc-8e4d-6ce8e45ad70c',
      label: 'Accounts',
      active: true
    },
    {
      id: 'ec9eece4-a6ea-46d1-b4c6-83fe3d3c490c',
      label: 'Sales',
      active: true
    },
    {
      id: '38730dec-9a67-4b8e-80a1-dddfeb5bb3be',
      label: 'Sales Manager',
      active: true
    }
  ];

  const onChange = (e, newValue) => {
    setValue(newValue);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Autocomplete
      multiple
      limitTags={3}
      options={options}
      getOptionLabel={(option) => option.label}
      onBlur={onBlur}
      onChange={onChange}
      size="small"
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} placeholder="" />}
      sx={{
        '& .MuiOutlinedInput-root': {
          p: 1
        },
        '& .MuiAutocomplete-tag': {
          bgcolor: 'primary.lighter',
          border: '1px solid',
          borderRadius: 1,
          height: 32,
          pl: 1.5,
          pr: 1.5,
          lineHeight: '32px',
          borderColor: 'primary.light',
          '& .MuiChip-label': {
            paddingLeft: 0,
            paddingRight: 0
          },
          '& .MuiSvgIcon-root': {
            color: 'primary.main',
            ml: 1,
            mr: -0.75,
            '&:hover': {
              color: 'primary.dark'
            }
          }
        }
      }}
    />
  );
};

MultiAutocompleteCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object,
  column: PropTypes.object,
  updateMyData: PropTypes.func,
  options: PropTypes.array,
  comp_id: PropTypes.number
};

export default MultiAutocompleteCell;
