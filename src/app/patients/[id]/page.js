'use client';
import { useEffect } from 'react';
import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './page.module.css';

export default function PatientDetailPage({params}) {
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
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Edad:</span>
                            <span className={styles.value}>10 años</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Peso:</span>
                            <span className={styles.value}>-</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Superficie corporal:</span>
                            <span className={styles.value}>-</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Obra social:</span>
                            <span className={styles.value}>-</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Historia clínica:</span>
                            <span className={styles.value}>{params.id}</span>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.editButton}>
                                Ver más / Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
