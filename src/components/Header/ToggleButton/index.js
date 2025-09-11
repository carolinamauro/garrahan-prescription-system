'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './ToggleButton.module.css';

export default function ToggleButton({ isCollapsed, onToggle }) {
    return (
        <button className={styles.toggleButton} onClick={onToggle}>
            {isCollapsed ? (
                <ChevronRight size={20} strokeWidth={2} />
            ) : (
                <ChevronLeft size={20} strokeWidth={2} />
            )}
        </button>
    );
}
