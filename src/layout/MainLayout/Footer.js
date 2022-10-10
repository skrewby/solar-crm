// material-ui
import { Link, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption"></Typography>
    <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        variant="subtitle2"
        color="secondary"
        component={Link}
        href="https://www.spacesolar.com.au"
        target="_blank"
        underline="hover"
      >
        About Us
      </Typography>
      <Typography variant="subtitle2" color="secondary" component={Link} href="https://www.google.com" target="_blank" underline="hover">
        Support
      </Typography>
    </Stack>
  </Stack>
);

export default Footer;
