// src/components/ActionCard/index.js
import styles from './ActionCard.module.css';

export default function ActionCard({ icon, title, description, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
