// src/components/PatientsTable/index.js
import styles from './PatientsTable.module.css';

export default function PatientsTable({ patients }) {
  return (
    <div className={styles.tableSection}>
      <h2>Últimos pacientes modificados</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>ID PACIENTE</div>
          <div className={styles.headerCell}>PACIENTE</div>
          <div className={styles.headerCell}>ESTADO</div>
        </div>

        {patients.map((p) => (
          <div className={styles.tableRow}
            key={p.id}>
            <div className={styles.cell}>{p.id}</div>
            <div className={styles.cell}>{p.name}</div>
            <div className={styles.cell}>
              <span className={styles.statusBadge}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
