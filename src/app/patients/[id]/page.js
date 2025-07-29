import styles from './page.module.css';

export default function PatientDetailPage({ params }) {
  // params.id contiene el ID del paciente de la URL
  const patientId = params.id;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Paciente {patientId}</h1>
        <p>Detalles completos del paciente</p>
      </div>

      <div className={styles.patientInfo}>
        <div className={styles.infoCard}>
          <h3>Información Personal</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>Juan Perez</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Edad:</span>
              <span className={styles.value}>10 años</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Diagnóstico:</span>
              <span className={styles.value}>Leucemia linfoblástica aguda</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
