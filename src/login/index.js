import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from './components/LoginForm';
import useAuth from '../../hooks/useAuth';
import PageLayout from '../../components/PageLayout';

const Login = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/user');
      return null;
    }
  }, [user]);

  return (
    <PageLayout isHiddenNav={true}>
      <LoginForm />
    </PageLayout>
  );
};

export default Login;
