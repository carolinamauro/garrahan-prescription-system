'use client';

import { Bell } from 'lucide-react';
import styles from './Notifications.module.css';

export default function Notifications() {
    return (
        <div className={styles.notifications}>
      <span className={styles.bellIcon}>
        <Bell size={25} strokeWidth={2} />
      </span>
        </div>
    );
}
