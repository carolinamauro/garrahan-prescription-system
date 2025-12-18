'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { admin } from '@/services/login';

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

export function NavUser({ user, onLogout, onLoginAs }) {
  const profesional = user.profesional || {};
  const fallback = getUsernameFallback(profesional?.nombre);
  const userName = user.role === admin ? 'Administrador' :
    `Dr. ${profesional.nombre} ${profesional.apellido}`;
  const userRole = user.role === admin ? '' : user.profesional.especialidad;
  const ohterRole = user.role === admin ? 'Médico' : 'Administrador';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{userName}</span>
              <span className="text-muted-foreground truncate text-xs">{userRole}</span>
            </div>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"
        className="w-48">
        <DropdownMenuItem onClick={onLoginAs}
          className="cursor-pointer">
          Cambiar a {ohterRole}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}
          className="cursor-pointer">
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
