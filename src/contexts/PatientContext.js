'use client';
import {createContext, useContext, useEffect, useState} from 'react';
import {fetchPacientes, fetchProtocoloPaciente} from '@/app/pacientes/new/services/api';
import {calcularEdad} from '@/lib/utils';

const PatientsContext = createContext();
const STORAGE_KEY = 'patientsData';
const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAndSync = async (timestamp) => {
    if (!timestamp || Date.now() - timestamp > SYNC_INTERVAL_MS) {
      await fetchAndStorePatients();
    }
  };

  const loadProtocols = async (pacientes) => {
    return Promise.all(
      pacientes.map(async (p) => {
        const {anios, dias} = calcularEdad(p.fecha_nacimiento);
        try {
          const protocolo = await fetchProtocoloPaciente(p.paciente_id);
          return {...p, protocolo, anios, dias};
        } catch {
          return {...p, protocolo: null, anios, dias};
        }
      })
    );
  };

  const fetchAndStorePatients = async () => {
    setLoading(true);
    let pacientes = await fetchPacientes().catch(() => null);
    if (!pacientes || pacientes.length === 0) {
      setPatients([]);
      return;
    }
    const updatedPatients = await loadProtocols(pacientes);

    setPatients(updatedPatients);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ pacientes: updatedPatients, timestamp: Date.now() })
    );

    setLoading(false);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPatients(parsed.pacientes);
        checkAndSync(parsed.timestamp);
        setLoading(false);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        fetchAndStorePatients();
      }
    } else {
      fetchAndStorePatients();
    }

  }, []);

  const updatePatient = async (id, updates) => {
    setPatients((prev) => {
      const updated = prev.map((p) =>
        (p.paciente_id ?? p.id) === id ? { ...p, ...updates } : p
      );
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ pacientes: updated, timestamp: Date.now() })
        );
      } catch (e) {
        console.error('Failed to write patients to localStorage', e);
      }
      return updated;
    });
  };

  const addPatient = async (patient) => {
    const updatedPatient = await loadProtocols([patient]);

    setPatients((prev) => {
      const updated = [...prev, updatedPatient[0]];
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ pacientes: updated, timestamp: Date.now() })
        );
      } catch (e) {
        console.error('Failed to write patients to localStorage', e);
      }
      return updated;
    });
  };

  return (
    <PatientsContext.Provider value={{ patients, updatePatient, addPatient, loading }}>
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => useContext(PatientsContext);
