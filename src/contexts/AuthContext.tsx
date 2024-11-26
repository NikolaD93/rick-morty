import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth } from '@/firebase/firebase.config';

interface User {
  email: string | null;
  accessToken: string;
}

interface DecodedToken {
  exp: number;
}

export const AuthContext = createContext<{
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}>({
  currentUser: null,
  login: () => {},
  logout: () => {},
});
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  const token = currentUser?.accessToken;

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded?.exp * 1000 < Date.now();
      if (isExpired) {
        logout();
      } else {
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: currentUser?.email,
            accessToken: currentUser?.accessToken,
          })
        );
      }
    }
  }, [currentUser, token]);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    auth.signOut();
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
