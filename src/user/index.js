import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserProfile from './components/UserProfile';
import useAuth from '../../hooks/useAuth';
import PageLayout from '../../components/PageLayout';

function User() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return null;
    }
  }, [user]);

  return (
    <PageLayout>
      <UserProfile />
    </PageLayout>
  );
}

export default User;
