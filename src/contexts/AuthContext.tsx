import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth } from '@/firebase/firebase.config';

interface User {
  email: string | null;
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

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

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
