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
import { useEffect, useState} from 'react';
import { usePatients } from '@/contexts/PatientContext';

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const pacientes = usePatients();

  useEffect(() => {
    const fetchNotifications = async () => {
      const notif = await fetchAlarmasPorProfesional();
      console.log('Notificaciones obtenidas:', notif);
      setNotifications(notif);
    };
    fetchNotifications();
  }, []);

  const obtenerTextoPaciente = (idPaciente) => {
    const paciente = pacientes.getPatientById(idPaciente);
    console.log('Paciente:', paciente);
    const nombreCompleto = paciente.nombre + ' ' + paciente.apellido;
    const articuloPaciente = paciente.sexo === 'M' ? 'El' : 'La';
    return articuloPaciente + ' paciente ' + nombreCompleto;
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

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
              p-0 text-[10px] flex items-center justify-center
              bg-destructive dark:bg-destructive hover:bg-destructive
              focus-visible:ring-destructive focus-visible:ring-[2px]"
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
          {notifications.map((notification) => (
            <Link key={notification.id}
              href={'/pacientes/' + notification.paciente_id}
              aria-label="Home"
            >
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
                <div className="flex w-full items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {'Nueva generación de receta requerida'}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {`${obtenerTextoPaciente(notification.paciente_id)} 
                    requiere la emisión de una nueva receta.`}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {`Última receta emitida hace ${notification.dias_transcurridos} días.`}
                    </p>
                  </div>
                  {notification.unread && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />}
                </div>
              </DropdownMenuItem>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
