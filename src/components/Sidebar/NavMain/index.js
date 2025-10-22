'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavMain({items}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}
              className="mb-2">
              <SidebarMenuButton tooltip={item.title}>
                <Link href={item.url}
                  className="flex items-center gap-3"
                  aria-label={item.title}>
                  {item.icon && <item.icon className="!w-6 !h-6 flex-shrink-0" />}
                  <span className="text-lg">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
