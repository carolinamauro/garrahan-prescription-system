import styles from './page.module.css';

export default function PrescriptionsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Recetas</h1>
        <p>Administra las prescripciones médicas del sistema</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryButton}>
          + Nueva Receta
        </button>
        <button className={styles.secondaryButton}>
          Importar Recetas
        </button>
      </div>

      <div className={styles.content}>
        <h2>Recetas Recientes</h2>
        <p>Aquí se mostrarían las recetas más recientes...</p>
      </div>
    </div>
  );
}
