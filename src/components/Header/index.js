import React from 'react';
import styles from './Header.module.css';
import SearchInput from "@/components/SearchInput";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.breadcrumb}>
            <h1>Pacientes</h1>
            <span>Gestión de Pacientes</span>
          </div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.searchBar}>
              <SearchInput placeholder="Buscar" />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.notifications}>
            <span className={styles.bellIcon}>🔔</span>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <span>👤</span>
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>Dr Amirul Haque</span>
              <span className={styles.userRole}>Oncólogo - Prescriptor</span>
            </div>
            <span className={styles.dropdownIcon}>▼</span>
          </div>
        </div>
      </div>
    </header>
  );
}
