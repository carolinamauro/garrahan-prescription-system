import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MenuItem.module.css';

export default function MenuItem({ item, isActive, isCollapsed }) {
  return (
    <li className={styles.menuItem}>
      <Link
        href={item.href}
        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
      >
        <Image src={item.icon}
          objectFit="contain"
          alt={item.label}
          width={24}
          height={24}
          style={{
            filter: isActive ? 'invert(1)' : 'invert(0)',
            color: isActive ? 'red' : 'black',
          }}
          className={isActive ? styles.activeIcon : styles.icon} />
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
