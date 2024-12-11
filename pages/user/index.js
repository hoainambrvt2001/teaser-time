// * Libs:
import { withRouter } from 'next/router';

// * Sub Components:
import UserProfile from '../../src/user/components/UserProfile';
import PageLayout from '../../components/PageLayout';

function UserProfilePage() {
  return (
    <PageLayout>
      <UserProfile />
    </PageLayout>
  );
}

export default withRouter(UserProfilePage);
