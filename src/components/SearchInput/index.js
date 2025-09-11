'use client';

import { useState } from 'react';
import styles from './SearchInput.module.css';
import { Search } from 'lucide-react';

export default function SearchInput({ placeholder, options = [] }) {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (option) => {
    setQuery(option);
    setShowOptions(false);
  };

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onFocus={() => query && setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 100)} // retraso para permitir click
        />
        <span className={styles.searchIcon}>
          <Search size={20} />
        </span>
      </div>

      {showOptions && filteredOptions.length > 0 && (
        <ul className={styles.optionsList}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className={styles.optionItem}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
