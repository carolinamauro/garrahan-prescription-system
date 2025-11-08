/* global alert */
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { usePatientForm } from './hooks/usePatientForm';
import { useProtocolos } from '@/hooks/useProtocolos';
import { useExternalPatientSearch } from './hooks/useExternalPatientSearch';
import { usePatientCreation } from './hooks/usePatientCreation';

import { PatientSearchSection } from '@/components/PatientSearchSection';
import { PatientDataSection } from '@/components/PatientDataSection';
import { ProtocolSection } from '@/components/ProtocolSection';
import { AlertPopup } from '@/components/AlertPopup';
import { useProtocolForm } from '@/hooks/useProtocolForm';

export default function NewPatientPage() {
  const router = useRouter();
  const { form, setForm, errors, handleChange, validate } = usePatientForm();
  const { protocolos, ciclos, setSelectedProtocolo } = useProtocolos();
  const { searchId, setSearchId, loadingSearch, handleSearch } = useExternalPatientSearch();
  const { showDialog, setShowDialog, createNewPatient } = usePatientCreation();
  const protocolForm = useProtocolForm(null, true);

  const handleSearchClick = async () => {
    const data = await handleSearch();
    if (data) {
      setForm((f) => ({
        ...f,
        nombre: data.nombre || '',
        apellido: data.apellido || '',
        id_hospitalario: data.id_hospitalario || '',
        fecha_nacimiento: data.fecha_nacimiento || ''
      }));
    }
  };

  const handleCreate = async () => {
    if (!validate()) {
      alert('Complete todos los campos obligatorios');
      return;
    }
    // TODO: Handelear el calculo de la superficie corporal y la altura en la creacion del paciente
    await createNewPatient(form, protocolForm.handleSave);
  };

  return (
    <div className="px-4 lg:px-6">
      <h1 className="mb-4 text-xl font-semibold">Agregar paciente</h1>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent>
          <div className="grid gap-6">
            <PatientSearchSection
              searchId={searchId}
              setSearchId={setSearchId}
              loadingSearch={loadingSearch}
              onSearch={handleSearchClick}
            />

            <PatientDataSection
              form={form}
              onChange={handleChange}
            />

            <ProtocolSection
              form={form}
              protocolForm={protocolForm}
              protocolos={protocolos}
              ciclos={ciclos}
              onProtocoloChange={(v) => {
                protocolForm.setSelectedProtocol(v);
                protocolForm.setSelectedRegimen('');
                protocolForm.setSelectedCiclo('');
                protocolForm.setSaveBtnDisabled(true);
                setSelectedProtocolo(v);
                setForm((f) => ({ ...f, protocolo: v, ciclo: '', regimen: '' }));

              }}
              onCicloChange={(v) => {
                protocolForm.setSelectedCiclo(v);
                protocolForm.setSelectedRegimen('');
                protocolForm.setSaveBtnDisabled(true);
                setForm((f) => ({ ...f, ciclo: v, regimen: '' }));
              }}
              onRegimenChange={(v) => {
                protocolForm.setSelectedRegimen(v);
                protocolForm.setSaveBtnDisabled(false);
                setForm((f) => ({ ...f, regimen: v }));
              }}
              onPesoChange={handleChange}
            />

            {errors.length > 0 && (
              <div className="text-destructive text-sm">
                <p>Faltan campos: {errors.join(', ')}</p>
              </div>
            )}

            <div className="pt-4">
              <Button size="lg"
                onClick={handleCreate}>
                Crear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertPopup
        title="Paciente creado"
        description="El paciente fue creado correctamente."
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleOnClick={() => router.push('/')}
      />
    </div>
  );
}
