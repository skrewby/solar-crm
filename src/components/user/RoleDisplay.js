import PropTypes from 'prop-types';
import { Box, Chip, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getRoleColour = (role) => {
  switch (role) {
    default:
      return 'error';
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
          <Chip size="small" variant="combined" label={data.name} color={getRoleColour(data.name)} sx={{ borderRadius: 10 }} />
        </ListItem>
      ))}
    </Box>
  );
};

RoleDisplay.propTypes = {
  roles: PropTypes.array
};

export default RoleDisplay;
