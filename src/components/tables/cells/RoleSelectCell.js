import { bpmAPI } from 'api/bpm/bpm-api';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// Material UI
const { Autocomplete, TextField } = require('@mui/material');

const RoleSelectCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(initialValue);

  const getData = useCallback(async () => {
    setOptions([]);

    try {
      const result = await bpmAPI.getRoles();
      if (result.data) {
        setOptions(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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

RoleSelectCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object,
  column: PropTypes.object,
  updateMyData: PropTypes.func,
  options: PropTypes.array,
  comp_id: PropTypes.number
};

export default RoleSelectCell;
