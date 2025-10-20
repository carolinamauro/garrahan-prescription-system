import React from 'react';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function PatientCard({ card }) {
  const Wrapper = card.hasInput ? 'div' : React.Fragment;

  return (
    <CardContent
      className={`grid ${card.hasInput ? 'grid-cols-2' : 'grid-cols-1'} gap-4 items-center`}
    >
      <Wrapper>
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <card.icon size={29} />
          </CardTitle>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span>{card.title}</span>
          </CardTitle>
        </CardHeader>

        <CardFooter
          className={`p-0 ${card.hasInput ? 'mt-4' : ''} flex-col items-start gap-1.5 text-sm`}
        >
          <div className="text-muted-foreground">{card.footer}</div>
        </CardFooter>
      </Wrapper>

      {card.hasInput && (
        <div className="flex justify-center w-full">
          <Input placeholder="Buscar paciente..." />
        </div>
      )}
    </CardContent>
  );
}
