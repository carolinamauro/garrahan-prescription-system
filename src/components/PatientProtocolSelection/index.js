import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog, AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import SearchProtocol from '@/components/SearchProtocol';

import data from '../../app/protocolos.json';
import {usePatients} from '@/contexts/PatientContext';

export function PatientProtocolSelection({ patient }) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const [protocolos] = useState(data);
  const [searchValue, setSearchValue] = useState('');

  const { updatePatient } = usePatients();
  const [form] = useState({
    protocolo: patient.protocolo || '',
  });

  const handleSave = async () => {
    form.protocolo = searchValue;
    await updatePatient(patient.id, form);
    setShowDialog(true);
  };

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-4 text-xl font-semibold">Protocolos de tratamiento</h2>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1.5fr]">
              Buscar protocolos de tratamiento

            <SearchProtocol
              placeholder="Buscar protocolos..."
              options={protocolos}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-6 flex gap-3 px-4 lg:px-4">
        <Button size="lg"
          onClick={handleSave}>
                    Guardar
        </Button>
        <Link href={`/pacientes/${patient.id}`}>
          <Button size="lg"
            variant="outline">
                        Salir
          </Button>
        </Link>
      </div>

      <AlertDialog open={showDialog}
        onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Datos guardados</AlertDialogTitle>
            <AlertDialogDescription>
                            El protocolo del paciente se guardó correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setShowDialog(false);
              setSearchValue('');
              router.push(`/pacientes/${patient.id}`);
            }}>
                            Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
