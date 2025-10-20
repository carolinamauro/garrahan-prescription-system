import { Card } from '@/components/ui/card';
import { Clipboard, Search } from 'lucide-react';
import { PatientCard } from '@/components/SectionCards/PatientCard';

const CARDS = [
  {
    id: 'panel',
    icon: Clipboard,
    title: 'Ver pacientes',
    footer: 'Listado de todos tus pacientes',
    hasInput: false,
  },
  {
    id: 'buscar',
    icon: Search,
    title: 'Buscar paciente',
    footer: 'Busca un paciente por su historia clínica, nombre o DNI',
    hasInput: true,
  },
];

export function SectionCards() {
  return (
    <div
      className={`*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card
        dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4
        *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs
        lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4`}
    >

      {CARDS.map((card) => (
        <Card
          key={card.id}
          className={`${card.id === 'buscar' ? '@5xl/main:col-span-3 @xl/main:col-span-2' : ''}`}
        >
          <PatientCard card={card} />
        </Card>
      ))}
    </div>
  );
}
