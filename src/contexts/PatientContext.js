'use client';
/* global fetch */
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProtocoloPaciente } from '@/services/protocolos';
import { fetchPacientes } from '@/services/pacientes';
import { calcularEdad } from '@/lib/utils';
import {useLogin} from '@/contexts/LoginContext';
import {useRouter} from 'next/navigation';

const PatientsContext = createContext();
const STORAGE_KEY = 'patientsData';
const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useLogin();

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
    if (!loggedIn) {
      setLoading(false);
      return;
    }

    setLoading(true);
    let pacientes = await fetchPacientes().catch((error) => {
      console.error('Error fetching pacientes:', error);
      return null;
    });
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

  }, [loggedIn]);

  const updatePatient = async (id, updates) => {
    try {
      // TODO: Sacar a services
      const response = await fetch(`http://localhost:3000/pacientes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          peso: updates.peso,
          altura: updates.altura,
          obra_social: updates.obra_social
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el paciente');
      }

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
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
      throw error;
    }
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

  const getPatientById = (id) => {
    return patients.find((p) => (String(p.paciente_id)) === String(id)) || null;
  };

  return (
    <PatientsContext.Provider
      value={{ patients, updatePatient, addPatient, loading, getPatientById }}>
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => useContext(PatientsContext);
