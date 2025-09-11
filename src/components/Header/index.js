'use client';

import { useHeader } from '@/app/contexts/HeaderContext';
import styles from './Header.module.css';
import ToggleButton from './ToggleButton';
import Title from './Title';
import Notifications from './Notifications';
import UserInfo from './UserInfo';

export default function Header({ isCollapsed, onToggle }) {
  const { title, subtitle } = useHeader();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />

        <div className={styles.leftSection}>
          <Title title={title} subtitle={subtitle} />
        </div>

        <div className={styles.rightSection}>
          <Notifications />
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
