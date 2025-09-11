'use client';

import { User } from 'lucide-react';
import styles from './UserInfo.module.css';

export default function UserInfo() {
    return (
        <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
                <User size={25} strokeWidth={2} />
            </div>
            <div className={styles.userDetails}>
                <span className={styles.userName}>Dr Amirul Haque</span>
                <span className={styles.userRole}>Oncólogo - Prescriptor</span>
            </div>
            <span className={styles.dropdownIcon}>▼</span>
        </div>
    );
}
