'use client';
import { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [title, setTitle] = useState('Pacientes');
  const [subtitle, setSubtitle] = useState('Menú principal');

  return (
    <HeaderContext.Provider value={{ title, setTitle, subtitle, setSubtitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
