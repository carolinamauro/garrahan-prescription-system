'use client';
import { useState, useEffect } from 'react';
import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './page.module.css';
import InfoPatient from "@/components/InfoPatient";
import Button from "@/components/Button";

export default function PatientDetailPage({ params }) {
    const { setTitle, setSubtitle } = useHeader();
    const peso = 0;
    const superficieCorporal = 0;
    const protocolo = null;
    const [activeTab, setActiveTab] = useState('resumen');

    useEffect(() => {
        setTitle(`Juan Perez`);
        setSubtitle('Detalles del paciente');
    }, [setTitle, setSubtitle]);

    const puedeSeleccionarProtocolo = peso > 0 && superficieCorporal > 0;

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
                        <span className={`${styles.value} ${protocolo ? styles.protocolo : styles.noProtocolo}`}>
                            {protocolo ? protocolo : "No tiene protocolo asignado"}
                        </span>
                    </div>
                    <div className={styles.buttonsGrid}>
                        <Button disabled={!puedeSeleccionarProtocolo}>
                            Seleccionar protocolo
                        </Button>
                        <Button disabled={!protocolo || !puedeSeleccionarProtocolo}>
                            Generar receta
                        </Button>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <div className={styles.tabHeaders}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'resumen' ? styles.active : ''}`}
                            onClick={() => setActiveTab('resumen')}
                        >
                            Resumen
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'detalle' ? styles.active : ''}`}
                            onClick={() => setActiveTab('detalle')}
                        >
                            Detalle
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'resumen' && (
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th>Ciclos</th>
                                    <th>Protocolo</th>
                                    <th>Fecha inicio</th>
                                    <th>Fecha fin</th>
                                    <th>Cantidad</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{protocolo || '-'}</td>
                                    <td>01/01/2025</td>
                                    <td>01/02/2025</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{protocolo || '-'}</td>
                                    <td>05/02/2025</td>
                                    <td>05/03/2025</td>
                                    <td>4</td>
                                </tr>
                                </tbody>
                            </table>
                        )}

                        {activeTab === 'detalle' && (
                            <div className={styles.detalle}>
                                <p>Aquí iría el detalle del tratamiento…</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
