// project import
import MainCard from 'components/MainCard';

import UserChangePasswordForm from './forms/UserChangePasswordForm';

// ==============================|| TAB - PASSWORD CHANGE ||============================== //

const TabPassword = () => {
  return (
    <MainCard title="Change Password">
      <UserChangePasswordForm />
    </MainCard>
  );
};

export default TabPassword;
