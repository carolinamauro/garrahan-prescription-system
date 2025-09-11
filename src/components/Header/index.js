'use client';

import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './Header.module.css';
import SearchInput from '@/components/SearchInput';
import {User, Bell} from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Header({ isCollapsed, onToggle }) {
  const { title, subtitle } = useHeader();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
          <button className={styles.toggleButton}
                  onClick={onToggle}>
              {isCollapsed ? (
                  <ChevronRight size={20}
                                strokeWidth={2} />
              ) : (
                  <ChevronLeft size={20}
                               strokeWidth={2} />
              )}
          </button>

          <div className={styles.leftSection}>
          <div className={styles.breadcrumb}>
            <h1>{title}</h1>
            <span>{subtitle}</span>
          </div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.searchBar}>
            <SearchInput placeholder="Buscar" />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.notifications}>
            <span className={styles.bellIcon}><Bell size={25}
              strokeWidth={2} /></span>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <User size={25}
                strokeWidth={2} />
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
