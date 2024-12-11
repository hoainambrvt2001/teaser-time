import { createContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, auth as firebaseAuth } from '../../config/firebase.js';
import { useRouter } from 'next/router.js';

const provider = new GoogleAuthProvider();

export const AuthContext = createContext({
  user: null,
  signInWithGoogle: async () => {},
  signOutWithFirebase: async () => {},
});

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState();

  const signInWithGoogle = async () => {
    const isAuthenticated = await signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        const errorMessage = error?.message;
        console.log('[useAuth] Error when authenticate', errorMessage);
        return false;
      });
    return isAuthenticated;
  };

  const signOutWithFirebase = async () => {
    await signOut(firebaseAuth);
    router.replace('/home');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) {
        setUser({
          userName: authUser.displayName,
          userEmail: authUser.email,
          userUid: authUser.uid,
          userPhotoUrl: authUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOutWithFirebase }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
