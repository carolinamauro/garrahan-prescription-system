'use client';
import { useEffect } from 'react';
import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './page.module.css';
import InfoPatient from "@/components/InfoPatient";
import Button from "@/components/Button";

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

            <div className={styles.protocolInfo}>
                <div className={styles.protocolCard}>
                    <div className={styles.protocolGrid}>
                        <span className={styles.label}>Protocolo de tratamiento</span>
                        <span className={styles.value}>No tiene protocolo asignado</span>
                    </div>
                    <div className={styles.buttonsGrid}>
                        <Button>Seleccionar protocolo</Button>
                        <Button>Generar receta</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
