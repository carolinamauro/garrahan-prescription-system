'use client';
import { useEffect } from 'react';
import { useHeader } from '@/app/contexts/HeaderContext';

import { Clipboard, Search } from 'lucide-react';
import styles from './page.module.css';
import ActionCard from '../components/ActionCard';
import SearchInput from '../components/SearchInput';
import PatientsTable from '../components/PatientsTable';

export default function Home() {
  const patients = [
    { id: 'ABO152', name: 'Juan Perez', status: 'En curso' },
    { id: 'ZSO152', name: 'Lucía Salto', status: 'En curso' },
  ];

  const { setTitle, setSubtitle } = useHeader();

  useEffect(() => {
      setTitle('Inicio');
      setSubtitle('Menú principal');
  }, [setTitle, setSubtitle]);

  return (
    <div className={styles.container}>
      {/* Action Cards */}
      <div className={styles.actionCards}>
        <ActionCard
          icon={<Clipboard size={32} />}
          title="Ver panel de pacientes"
          description="Listado de todos tus pacientes"
        />

        <ActionCard
          icon={<Search size={32} />}
          title="Buscar paciente"
          description="Busca un paciente por su historia clínica, nombre o DNI"
        >
          <SearchInput
            placeholder="Buscar"
            options={patients}
          />
        </ActionCard>
      </div>

      {/* Recent Patients Table */}
      <PatientsTable patients={patients} />
    </div>
  );
}
