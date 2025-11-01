'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '@/services/login';

const LoginContext = createContext();

const STORAGE_KEY = 'loginData';
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hora

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginAs = async (role) => {
    try {
      const loggedUser = await loginUser(role);
      const dataToStore = {
        user: loggedUser,
        timestamp: Date.now(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      setUser(loggedUser);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error en loginAs:', error);
      throw error;
    }
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const expired = Date.now() - parsed.timestamp > SESSION_DURATION_MS;

        if (!expired && parsed.user) {
          setUser(parsed.user);
          setLoggedIn(true);
        } else {
          console.warn('Sesión expirada, se requiere nuevo login');
          window.localStorage.removeItem(STORAGE_KEY);
        }
      } catch (err) {
        console.error('Error leyendo loginData del localStorage:', err);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  return (
    <LoginContext.Provider value={{ user, loggedIn, loginAs }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
