import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContinueButtons } from '@/components/GenerarRecetaSelector/ContinueButtons';
import { SelectorCard } from '@/components/GenerarRecetaSelector/SelectorCard';

export function GenerarRecetaSelector({ paciente }) {
  const id = paciente.paciente_id;
  const router = useRouter();
  const [selectedCycles, setSelectedCycles] = useState('1');

  const handleContinue = () => {
    router.push(`/pacientes/${id}/generar-receta/medicamentos?ciclos=${selectedCycles}`);
  };

  return (
    <div className="px-4 lg:px-6 mt-6">
      <Card>
        <CardContent className="p-6">
          <SelectorCard
            selectedCycles={selectedCycles}
            setSelectedCycles={setSelectedCycles}
            paciente={paciente}
          />
        </CardContent>
      </Card>

      <ContinueButtons handleContinue={handleContinue} />
    </div>
  );
}
