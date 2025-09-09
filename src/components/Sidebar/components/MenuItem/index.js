import React from 'react';
import Link from 'next/link';
import styles from './MenuItem.module.css';

export default function MenuItem({ item, isActive, isCollapsed }) {
    const Icon = item.icon;

    return (
        <li className={styles.menuItem}>
            <Link
                href={item.href}
                className={`${styles.menuLink} ${isActive ? styles.active : ''} ${isCollapsed ? styles.collapsed : ''}`}
            >
                <Icon
                    size={24}
                    className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`}
                />
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
