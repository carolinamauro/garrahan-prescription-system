'use client';

import { Users, Archive, FileSearch2, LayoutGridIcon } from 'lucide-react';
import { NavMain } from '@/components/Sidebar/NavMain';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const NAV_MAIN_ITEMS = [
  {
    title: 'Inicio',
    url: '/',
    icon: LayoutGridIcon,
  },
  {
    title: 'Pacientes',
    url: '/pacientes',
    icon: Users,
  },
  {
    title: 'Alertas',
    url: '/alertas',
    icon: Archive,
  },
  {
    title: 'Recetas',
    url: '/recetas',
    icon: FileSearch2,
  }
];

export function AppSidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'icon',
  className,
  ...rest
}) {
  return (
    <Sidebar
      side={side}
      variant={variant}
      collapsible={collapsible}
      className={className}
      {...rest}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/"
                aria-label="Home">
                <img src="/menu_icon.svg"
                  alt="logo"/>
                <span className="text-base font-semibold">Sistema recetas oncológicas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_MAIN_ITEMS} />
      </SidebarContent>
    </Sidebar>
  );
}
