import LoginForm from '../../src/login/components/LoginForm';
import PageLayout from '../../components/PageLayout';

const LoginPage = () => {
  return (
    <PageLayout isHiddenNav={true}>
      <LoginForm />
    </PageLayout>
  );
};

export default LoginPage;
