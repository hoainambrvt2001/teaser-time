import { useRouter } from 'next/router';
import { GoogleLoginButton } from 'react-social-login-buttons';
import login from './index.module.scss';
import useAuth from '../../../../hooks/useAuth';

function LoginForm() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const onClickLogin = async () => {
    const isAuthenticated = await signInWithGoogle();
    if (isAuthenticated) {
      router.replace('/user');
    }
  };

  return (
    <div className={login.body}>
      <div className={login.LoginField}>
        <h1>Login to Teaser Time</h1>
        <form>
          <GoogleLoginButton onClick={onClickLogin} />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
