'use client';

import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const idRolAdmin = '1';
const idRolMedico = '2';
const admin = 'admin';

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginAs = async (role) => {
    const currUser = {
      id: role === admin ? idRolAdmin : idRolMedico,
      name: role === admin ? 'Administrador' : 'Dr. Miguel Merentiel',
      role
    };

    const response = await fetch('http://localhost:3000/auth/login-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(currUser)
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    setUser(currUser);
    setLoggedIn(true);
  };

  return (
    <LoginContext.Provider value={{ user, loggedIn, loginAs }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
