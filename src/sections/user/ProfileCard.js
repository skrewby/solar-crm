import PropTypes from 'prop-types';

// project import
import MainCard from 'components/MainCard';

// ==============================|| USER PROFILE - TOP CARD ||============================== //

const ProfileCard = () => {
  return <MainCard border={false} content={false} sx={{ bgcolor: 'primary.lighter', position: 'relative' }} />;
};

ProfileCard.propTypes = {
  focusInput: PropTypes.func
};

export default ProfileCard;
