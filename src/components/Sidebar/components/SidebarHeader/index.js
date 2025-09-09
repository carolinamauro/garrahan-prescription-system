import React from 'react';
import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from './SidebarHeader.module.css';

export default function SidebarHeader({ isCollapsed, onToggle }) {
    return (
        <div className={`${isCollapsed ? styles.sidebarHeaderCollapsed : styles.sidebarHeader} ${styles.sidebarHeader}`} >
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
                {isCollapsed ? (
                    <ChevronRight size={20} strokeWidth={2} />
                ) : (
                    <ChevronLeft size={20} strokeWidth={2} />
                )}
            </button>
        </div>
    );
}
