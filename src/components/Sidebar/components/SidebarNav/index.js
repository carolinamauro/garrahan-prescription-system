import styles from './SidebarNav.module.css';
import MenuItem from '../MenuItem';

export default function SidebarNav({ menuItems, pathname, isCollapsed }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <MenuItem
              key={item.id}
              item={item}
              isActive={isActive}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </ul>
    </nav>
  );
}
