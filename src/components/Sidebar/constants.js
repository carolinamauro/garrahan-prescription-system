import {Users, Archive, FileSearch2, LayoutGridIcon} from 'lucide-react';

export const MENU_ITEMS = [
  {
    id: 'home',
    label: 'Inicio',
    icon: LayoutGridIcon,
    href: '/',
  },
  {
    id: 'patients',
    label: 'Pacientes',
    icon: Users,
    href: '/patients',
  },
  {
    id: 'alerts',
    label: 'Alertas',
    icon: Archive,
    href: '/alerts',
  },
  {
    id: 'prescriptions',
    label: 'Recetas',
    icon: FileSearch2,
    href: '/prescriptions',
  },
];
