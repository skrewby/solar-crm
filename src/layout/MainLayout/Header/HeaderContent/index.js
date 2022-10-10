import { useMemo } from 'react';

// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import useConfig from 'hooks/useConfig';
import Search from './Search';
import Profile from './Profile';
import Localization from './Localization';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { i18n } = useConfig();

  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localization = useMemo(() => <Localization />, [i18n]);

  return (
    <>
      {!matchesXs && <Search />}
      {!matchesXs && localization}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
