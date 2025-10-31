'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function getUsernameFallback(name) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    const firstInitial = parts[0]?.charAt(0) || '';
    const lastInitial = parts.length > 1
      ? parts[parts.length - 1].charAt(0)
      : (parts[0]?.charAt(1) || '');
    return (firstInitial + lastInitial).toUpperCase();
  }
}

export function NavUser({user}) {
  let fallback = getUsernameFallback(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar}
                alt={user.name} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Dr. {user.name}</span>
              <span className="text-muted-foreground truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
