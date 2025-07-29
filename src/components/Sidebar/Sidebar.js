import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar({ isCollapsed, onToggle }) {
  const pathname = usePathname();

  const menuItems = [
    { id: 'patients', label: 'Pacientes', icon: '👥', href: '/patients' },
    { id: 'alerts', label: 'Alertas', icon: '🔔', href: '/alerts', badge: 3 },
    { id: 'prescriptions', label: 'Recetas', icon: '📄', href: '/prescriptions' },
  ];

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
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className={styles.nav}>
        {!isCollapsed && <h3 className={styles.menuTitle}>Menu</h3>}
        <ul className={styles.menu}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}
                className={styles.menuItem}>
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
          })}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        {!isCollapsed && (
          <>
            <div className={styles.settingsItem}>
              <span className={styles.icon}>⚙️</span>
              <span className={styles.label}>Settings</span>
            </div>
            <div className={styles.developerInfo}>
              Developed by Medimind Systems B.V
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
