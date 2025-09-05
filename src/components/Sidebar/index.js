import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import MenuItem from './components/MenuItem';
import { MENU_ITEMS } from './constants';

import chevronRight from '../../assets/icons/chevron-right.png';
import chevronLeft from '../../assets/icons/chevron-left.png';

export default function Sidebar({ isCollapsed, onToggle }) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>💊</span>
          {!isCollapsed && (
            <div className={styles.logoText}>
              <h2>Sistema recetas oncológicas</h2>
            </div>
          )}
        </div>
        <button
          className={styles.toggleButton}
          onClick={onToggle}
        >
          <Image src={isCollapsed ? chevronRight : chevronLeft}
            alt="chevron"
            width={16}
            height={16} />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <MenuItem
                key={item.id}
                item={item}
                isActive={isActive}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
