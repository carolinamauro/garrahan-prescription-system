// src/components/SearchInput/index.js
import styles from './SearchInput.module.css';

export default function SearchInput({ placeholder }) {
  return (
    <div className={styles.searchInput}>
      <input type="text"
        placeholder={placeholder} />
      <span className={styles.searchIcon}>🔍</span>
    </div>
  );
}
