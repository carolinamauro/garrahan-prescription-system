import React from 'react';
import Link from 'next/link';
import styles from './MenuItem.module.css';

export default function MenuItem({ item, isActive, isCollapsed }) {
  return (
    <li className={styles.menuItem}>
      <Link
        href={item.href}
        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
      >
        <span className={styles.icon}>{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className={styles.label}>{item.label}</span>
            {item.badge && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </>
        )}
      </Link>
    </li>
  );
}
