import styles from './SearchInput.module.css';
import { Search } from 'lucide-react';

export default function SearchInput({ placeholder }) {
    return (
        <div className={styles.searchInput}>
            <input type="text" placeholder={placeholder} />
            <span className={styles.searchIcon}>
        <Search size={20} />
      </span>
        </div>
    );
}
