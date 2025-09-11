import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { MENU_ITEMS } from './constants';

import SidebarHeader from './components/SidebarHeader';
import SidebarNav from './components/SidebarNav';

export default function Sidebar({ isCollapsed }) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <SidebarHeader />
      <SidebarNav
        menuItems={MENU_ITEMS}
        pathname={pathname}
        isCollapsed={isCollapsed}
      />
    </aside>
  );
}
