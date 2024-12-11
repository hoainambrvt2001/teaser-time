import LoginForm from './components/LoginForm';
import PageLayout from '../../components/PageLayout';

const Login = () => {
  return (
    <PageLayout isHiddenNav={true}>
      <LoginForm />
    </PageLayout>
  );
};

export default Login;
