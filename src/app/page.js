import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Action Cards */}
      <div className={styles.actionCards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📋</div>
          <h3>Ver panel de pacientes</h3>
          <p>Listado de todos tus pacientes</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>🔍</div>
          <h3>Buscar paciente</h3>
          <p>Busca un paciente por su historia clínica, nombre o DNI</p>
          <div className={styles.searchInput}>
            <input type="text"
              placeholder="Buscar..." />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>
      </div>

      {/* Recent Patients Table */}
      <div className={styles.tableSection}>
        <h2>Últimos pacientes modificados</h2>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>ID PACIENTE</div>
            <div className={styles.headerCell}>PACIENTE</div>
            <div className={styles.headerCell}>ESTADO</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.cell}>ABO152</div>
            <div className={styles.cell}>Juan Perez</div>
            <div className={styles.cell}>
              <span className={styles.statusBadge}>En curso</span>
            </div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.cell}>ZSO152</div>
            <div className={styles.cell}>Lucía Salto</div>
            <div className={styles.cell}>
              <span className={styles.statusBadge}>En curso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
