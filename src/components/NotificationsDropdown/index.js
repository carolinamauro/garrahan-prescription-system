'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconBell } from '@tabler/icons-react';
import Link from 'next/link';
import { fetchAlarmasPorProfesional } from '@/services/alarma';
import { useEffect, useState } from 'react';

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notif = await fetchAlarmasPorProfesional();
      const enriched = notif.map(n => ({ ...n, unread: n.unread ?? true }));
      setNotifications(enriched);
    };
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"
          size="icon"
          className="relative">
          <IconBell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full
              p-0 text-[10px] flex items-center justify-center bg-destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80"
        align="end">
        <div className="flex items-center justify-between px-4 py-2">
          <h3 className="font-semibold">Notificaciones</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary"
              className="ml-auto">
              {unreadCount} nuevas
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator />

        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              No hay notificaciones.
            </p>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.alarma_id}
                onClick={() =>
                  setNotifications(prev =>
                    prev.map(x =>
                      x.alarma_id === n.alarma_id ? { ...x, unread: false } : x
                    )
                  )
                }
                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-none">
                      Paciente #{n.paciente_id}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Última receta: {new Date(n.fecha_ultima_receta).toLocaleDateString('es-AR')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Días transcurridos: <b>{n.dias_transcurridos}</b>
                    </p>
                  </div>
                  {n.unread && (
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/alertas"
            className="w-full text-center py-2 cursor-pointer">
            Ver todas las notificaciones
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
