'use client';
import { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [title, setTitle] = useState('Inicio');
  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
