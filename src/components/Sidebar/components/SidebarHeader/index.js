import Image from 'next/image';
import styles from './SidebarHeader.module.css';

export default function SidebarHeader({ isCollapsed }) {
  return (
    <div
      className={`${isCollapsed ?
        styles.sidebarHeaderCollapsed : styles.sidebarHeader} ${styles.sidebarHeader}`}
    >
      <div className={styles.logo}>
        <Image
          src="menu_icon.svg"
          alt="Logo"
          width={28}
          height={28}
          className={styles.logoIcon}
        />

        {!isCollapsed && (
          <div className={styles.logoText}>
            <h2>Sistema recetas oncológicas</h2>
          </div>
        )}
      </div>
    </div>
  );
}
