'use client';
import { useEffect } from 'react';
import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './page.module.css';
import InfoPatient from "@/components/InfoPatient";

export default function PatientDetailPage({ params }) {
    const { setTitle, setSubtitle } = useHeader();

    useEffect(() => {
        setTitle(`Juan Perez`);
        setSubtitle('Detalles del paciente');
    }, [setTitle, setSubtitle]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Resumen</h1>
            </div>

            <InfoPatient id={params.id} />
        </div>
    );
}
