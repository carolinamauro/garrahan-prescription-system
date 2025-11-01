'use client';

import { createContext, useContext, useState } from 'react';
import { loginUser } from '@/services/login';

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginAs = async (role) => {
    const loggedUser = await loginUser(role);
    setUser(loggedUser);
    setLoggedIn(true);
  };

  return (
    <LoginContext.Provider value={{ user, loggedIn, loginAs }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
