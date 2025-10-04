import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Clipboard, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

const CARDS = [
  {
    id: 'panel',
    icon: Clipboard,
    title: 'Ver panel de pacientes',
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
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {CARDS.map((card) => (
        <Card key={card.id}
          className="@container/card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <card.icon size={29} />
            </CardTitle>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <span>{card.title}</span>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">{card.footer}</div>
          </CardFooter>

          {card.hasInput && (
            <CardContent>
              <Input />
            </CardContent>
          )}
        </Card>
      ))}

    </div>
  );
}
