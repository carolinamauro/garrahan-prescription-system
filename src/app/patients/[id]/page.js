'use client';
import { useEffect } from 'react';
import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './page.module.css';
import InfoItem from '../../../components/InfoItem';
import Button from '../../../components/Button';

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

            <div className={styles.patientInfo}>
                <div className={styles.infoCard}>
                    <div className={styles.infoGrid}>
                        <InfoItem label="Edad" value="10 años" />
                        <InfoItem label="Peso" value="-" />
                        <InfoItem label="Superficie corporal" value="-" />
                        <InfoItem label="Obra social" value="-" />
                        <InfoItem label="Historia clínica" value={params.id} />
                        <Button>Ver más / Editar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
