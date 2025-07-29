import styles from './page.module.css';

export default function PatientsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Pacientes</h1>
        <p>Administra y visualiza todos los pacientes del sistema</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Pacientes</h3>
          <span className={styles.statNumber}>1,247</span>
        </div>
        <div className={styles.statCard}>
          <h3>En Tratamiento</h3>
          <span className={styles.statNumber}>892</span>
        </div>
        <div className={styles.statCard}>
          <h3>Nuevos este mes</h3>
          <span className={styles.statNumber}>45</span>
        </div>
      </div>

      <div className={styles.content}>
        <h2>Lista de Pacientes</h2>
        <p>Aquí iría la tabla de pacientes...</p>
      </div>
    </div>
  );
}
