'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchPacientes, fetchProtocoloPaciente } from '@/app/pacientes/new/services/api';

const PatientsContext = createContext();

function calcularEdad(fechaNacimientoStr) {
  if (!fechaNacimientoStr) return { anios: null, dias: null };

  const nacimiento = new Date(fechaNacimientoStr);
  const hoy = new Date();

  // Años completos
  let edadAnios = hoy.getFullYear() - nacimiento.getFullYear();

  // Resto uno si no pasó el cumpleaños este año
  const cumpleEsteAno = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  if (hoy < cumpleEsteAno) {
    edadAnios--;
  }

  // Calculo días restantes desde el último cumpleaños
  const ultimoCumple = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  if (hoy < ultimoCumple) {
    ultimoCumple.setFullYear(ultimoCumple.getFullYear() - 1);
  }
  const diffMs = hoy - ultimoCumple;
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDias = Math.floor(diffMs / msPerDay);

  return { anios: edadAnios, dias: diffDias };
}

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPacientes()
      .then(setPatients)
      .catch(() => setPatients([]));
  }, []);

  useEffect(() => {
    if (patients.length === 0) return;

    const loadProtocols = async () => {
      const updatedPatients = await Promise.all(
        patients.map(async (p) => {
          const { anios, dias } = calcularEdad(p.fecha_nacimiento);
          try {
            const protocolo = await fetchProtocoloPaciente(p.paciente_id);
            return { ...p, protocolo, anios, dias };
          } catch {
            return { ...p, protocolo: null, anios, dias };
          }
        })
      );
      setPatients(updatedPatients);
    };

    void loadProtocols();
  }, [patients.length]);

  const updatePatient = (id, updates) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  return (
    <PatientsContext.Provider value={{ patients, updatePatient }}>
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => useContext(PatientsContext);
