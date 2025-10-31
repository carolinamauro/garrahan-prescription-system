/* global fetch */
'use client';
import { useContext, useEffect, useState, createContext } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {

  const [login, setLogin] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      const storedLogin = window.localStorage.getItem('loginData');
      if (storedLogin) {
        setLogin(JSON.parse(storedLogin));
      } else {
        const login = async (role) => {
          await fetch('http://localhost:3000/auth/login-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              id: role === 'admin' ? '1' : '2',
              name: role === 'admin' ? 'Admin' : 'Dr. Juan',
              role
            })
          });
        };
        login('medico').then(() => {
          setLogin({ id: '2', name: 'Dr. Juan', role: 'medico' });
          window.localStorage.
            setItem('loginData', JSON.stringify({ id: '2', name: 'Dr. Juan', role: 'medico' }));
        });
      }
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={{login, setLogin}}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginProvider);
