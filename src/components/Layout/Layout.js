'use client';
import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={styles.appLayout}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={`${styles.contentWrapper} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
        <Header />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
