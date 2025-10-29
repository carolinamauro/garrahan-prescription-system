'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { DataTable } from '@/components/DataTable';
import { getMedicationColumns } from '@/components/DataTable/TableColumns';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { RecetaButtons } from '@/components/RecetaButtons';

function shouldEnableExportButton(medications) {
  return medications.every((m) => (m.presentation ?? '') !== '');
}

export default function MedicamentosPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const cycles = searchParams.get('ciclos') || '1';
  const [medications, setMedications] = useState([]);
  const [exportBtnDisabled, setExportBtnDisabled] = useState(true);
  const [presentationsByDrug, setPresentationsByDrug] = useState({});
  const [selectedForms, setSelectedForms] = useState({});
  const [availableConcentrations, setAvailableConcentrations] = useState({});

  useEffect(() => {
    const fetchProtocoloActual = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pacientes/${params.id}/protocolo-actual`, {credentials: 'include'});
        const protocolo = await response.json();

        // Transform administraciones into the medications format we need
        const meds = protocolo.administraciones.map(admin => ({
          id: admin.admin_id,
          droga_id: admin.droga_id,
          nombre: admin.nombre_droga,
          presentation: '',
          concentration: ''
        }));

        setMedications(meds);

        // Fetch presentations for each drug
        const presentationsPromises = meds.map(med =>
          fetch(`http://localhost:3000/drogas/${med.droga_id}/presentaciones`, {credentials: 'include'})
            .then(res => res.json())
        );

        const allPresentations = await Promise.all(presentationsPromises);

        // Create a map of drug_id to its presentations
        const presentationsMap = {};
        meds.forEach((med, index) => {
          const presentations = allPresentations[index];
          // Group presentations by forma_farmaceutica_nombre
          const uniqueForms = [...new Set(presentations.map(p => p.forma_farmaceutica_nombre))];
          presentationsMap[med.droga_id] = presentations;

          // If there's only one form and one concentration, select it automatically
          if (uniqueForms.length === 1 && presentations.length === 1) {
            handlePresentationChange(med.id, uniqueForms[0]);
          }
        });

        setPresentationsByDrug(presentationsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProtocoloActual();
  }, [params.id]);

  const handlePresentationChange = (id, forma_farmaceutica_nombre) => {
    // Get the drug from medications
    const medication = medications.find(med => med.id === id);
    if (!medication) return;

    // Get all presentations for this drug with the selected form
    const allPresentations = presentationsByDrug[medication.droga_id] || [];
    const presentationsForForm = allPresentations.filter(
      p => p.forma_farmaceutica_nombre === forma_farmaceutica_nombre
    );

    // Update selected form and available concentrations
    setSelectedForms(prev => ({
      ...prev,
      [id]: forma_farmaceutica_nombre
    }));

    setAvailableConcentrations(prev => ({
      ...prev,
      [id]: presentationsForForm
    }));

    // Update medications state
    const updated = medications.map((med) =>
      med.id === id ? {
        ...med,
        presentation: forma_farmaceutica_nombre,
        // If there's only one concentration, select it automatically
        concentration: presentationsForForm.length === 1
          ? `${presentationsForForm[0].fuerza_valor} ${presentationsForForm[0].fuerza_unidad}`
          : ''
      } : med
    );

    setMedications(updated);
    setExportBtnDisabled(!shouldEnableExportButton(updated));
  };

  const handleConcentrationChange = (id, presentacion) => {
    const updated = medications.map((med) =>
      med.id === id ? {
        ...med,
        concentration: `${presentacion.fuerza_valor} ${presentacion.fuerza_unidad}`
      } : med
    );
    setMedications(updated);
    setExportBtnDisabled(!shouldEnableExportButton(updated));
  };

  const handleDelete = (id) => () => {
    setMedications((prev) =>
      prev.filter((med) => med.id !== id)
    );
  };

  const columns = getMedicationColumns(
    handlePresentationChange,
    handleDelete,
    presentationsByDrug,
    handleConcentrationChange,
    selectedForms,
    availableConcentrations
  );

  return (
    <div className="px-5 lg:px-5">
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardContent className="pt-2">
          <CardTitle className="mb-6">Cantidad de ciclos: {cycles}</CardTitle>
          <p className="mb-6 text-sm font-medium text-muted-foreground">

          </p>

          <div className="[&_div]:!p-0">
            <DataTable
              data={medications}
              columns={columns}
              withTableColumnSelector={false}
              withActionButtons={false}
              withSelectedRowsCount={false}
              withFooter={false}
              tabsList={[]}
            />
          </div>

          <RecetaButtons exportBtnDisabled={exportBtnDisabled} />

        </CardContent>
      </Card>
    </div>
  );
}
