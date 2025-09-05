import menuIcon from '../../assets/icons/menu.png';
import patientsIcon from '../../assets/icons/users.png';
import alertsIcon from '../../assets/icons/bell.png';
import prescriptionsIcon from '../../assets/icons/pencil-alt.png';

export const MENU_ITEMS = [
  {
    id: 'home',
    label: 'Inicio',
    icon: menuIcon,
    href: '/',
  },
  {
    id: 'patients',
    label: 'Pacientes',
    icon: patientsIcon,
    href: '/patients',
  },
  {
    id: 'alerts',
    label: 'Alertas',
    icon: alertsIcon,
    href: '/alerts',
  },
  {
    id: 'prescriptions',
    label: 'Recetas',
    icon: prescriptionsIcon,
    href: '/prescriptions',
  },
];
