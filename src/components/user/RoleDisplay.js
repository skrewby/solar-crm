import PropTypes from 'prop-types';
import { Box, Chip, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getRoleColour = (role) => {
  switch (role) {
    case 'System Administrator':
      return 'volcano';
    case 'Operations':
      return 'blue';
    case 'Sales':
      return 'green';
    case 'General Manager':
      return 'red';
    case 'Services':
      return 'geekblue';
    case 'Administration':
      return 'magenta';
    case 'Accounts':
      return 'purple';
    case 'Warehouse':
      return 'gold';
    default:
      return 'red';
  }
};

const RoleDisplay = ({ roles }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        border: '0px',
        borderColor: theme.palette.grey[300],
        borderRadius: 1,
        p: 0.5,
        m: 0
      }}
      component="ul"
    >
      {roles.map((data) => (
        <ListItem key={data.id}>
          <Chip size="small" variant="outlined" label={data.name} color={getRoleColour(data.name)} sx={{ borderRadius: 10 }} />
        </ListItem>
      ))}
    </Box>
  );
};

RoleDisplay.propTypes = {
  roles: PropTypes.array
};

export default RoleDisplay;
