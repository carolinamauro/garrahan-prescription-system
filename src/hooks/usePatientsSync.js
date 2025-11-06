'use client';

import { useState, useEffect, useCallback } from 'react';
import { loadPatientsWithProtocols, fetchPacientes, loadPatientWithProtocol } from '@/services/pacientes';

const STORAGE_KEY = 'patientsData';
const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

export function usePatientsSync({ loggedIn }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAndSync = useCallback(async (timestamp) => {
    if (!timestamp || Date.now() - timestamp > SYNC_INTERVAL_MS) {
      await fetchAndStorePatients();
    }
  }, []);

  const fetchAndStorePatients = useCallback(async () => {
    if (!loggedIn) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const pacientes = await fetchPacientes();
      if (!pacientes || pacientes.length === 0) {
        setPatients([]);
        return;
      }

      const updatedPatients = await loadPatientsWithProtocols(pacientes);
      setPatients(updatedPatients);

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ pacientes: updatedPatients, timestamp: Date.now() })
      );
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  }, [loggedIn]);

  const refreshPatientProtocol = useCallback(async (id) => {
    const patient = patients.find((p) => String(p.paciente_id) === String(id));
    if (!patient) return null;

    try {
      const updatedPatient = await loadPatientWithProtocol(patient);

      setPatients((prev) => {
        const updated = prev.map((p) =>
          String(p.paciente_id) === String(id) ? updatedPatient : p
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

      return updatedPatient;
    } catch (error) {
      console.error('Error refreshing patient protocol:', error);
      return null;
    }
  }, [patients]);

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
  }, [loggedIn, checkAndSync, fetchAndStorePatients]);

  return {
    patients,
    setPatients,
    loading,
    refreshPatientProtocol
  };
}