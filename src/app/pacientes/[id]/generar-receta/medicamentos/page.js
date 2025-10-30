'use client';
/* global fetch */
import React, { useState, useEffect } from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import { DataTable } from '@/components/DataTable';
import { getMedicationColumns } from '@/components/DataTable/TableColumns';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { RecetaButtons } from '@/components/RecetaButtons';
import { useHeader } from '@/contexts/HeaderContext';
import { usePatients } from '@/contexts/PatientContext';
import { useRecipeGenerator } from '@/app/pacientes/new/hooks/useRecipeGenerator';

function shouldEnableExportButton(medications) {
  return medications.every((m) =>
    (m.presentation ?? '') !== '' &&
    (m.concentration ?? '') !== '' &&
    (m.needed_amount ?? '') !== ''
  );
}

export default function MedicamentosPage({ params }) {
  const searchParams = useSearchParams();
  const { setTitle, setSubtitle } = useHeader();
  const { generateRecipe } = useRecipeGenerator();
  const { patients } = usePatients();
  const { id } = React.use(params);
  const patient = patients.find((p) => String(p.paciente_id) === String(id));
  const cycles = searchParams.get('ciclos') || '1';
  const [medications, setMedications] = useState([]);
  const [exportBtnDisabled, setExportBtnDisabled] = useState(true);
  const [presentationsByDrug, setPresentationsByDrug] = useState({});
  const [selectedForms, setSelectedForms] = useState({});
  const [availableConcentrations, setAvailableConcentrations] = useState({});

  useEffect(() => {
    setTitle(`${patient.nombre} ${patient.apellido}`);
    setSubtitle('Generar receta');
  }, []);
  useEffect(() => {
    const fetchProtocoloActual = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pacientes/${id}/protocolo-actual`, {credentials: 'include'});
        const protocolo = await response.json();

        // Transform administraciones into the medications format we need
        const meds = protocolo.administraciones.map(admin => ({
          id: admin.admin_id,
          droga_id: admin.droga_id,
          nombre: admin.nombre_droga,
          administracion_id: admin.admin_id,
          presentation: '',
          concentration: '',
          concentrationData: null,
          needed_amount: '',
          onCalculate: handleCalculate
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
  }, [id]);

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
        concentration: `${presentacion.fuerza_valor} ${presentacion.fuerza_unidad}`,
        concentrationData: presentacion,
        needed_amount: '' // Resetear la cantidad necesaria cuando cambia la concentración
      } : med
    );
    setMedications(updated);
    setExportBtnDisabled(!shouldEnableExportButton(updated));
  };

  const handleDelete = (id) => () => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCalculate = async (medication) => {
    try {
      const response = await fetch('http://localhost:3000/calculo/calculo-droga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          administracion_id: medication.administracion_id,
          peso: patient.peso,
          nueva_fuerza_valor: medication.concentrationData.fuerza_valor,
          nueva_fuerza_unidad: medication.concentrationData.fuerza_unidad
        })
      });

      if (!response.ok) {
        throw new Error('Error al calcular la droga');
      }

      const result = await response.json();

      setMedications(prev => {
        const updated = prev.map(med => {
          if (med.id === medication.id) {
            return {
              ...med,
              total_dosis_amount: result.cantidad_total,
              total_units: result.unidades,
              total_dosis_unit: result.fuerza_unidad,
              needed_amount:
                  `${result.cantidad_total} ${result.fuerza_unidad} (${result.unidades} unidades)`
            };
          }
          return med;
        });
        setExportBtnDisabled(!shouldEnableExportButton(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error al calcular la droga:', error);
    }
  };

  const columns = getMedicationColumns(
    handlePresentationChange,
    handleDelete,
    presentationsByDrug,
    handleConcentrationChange,
    selectedForms,
    availableConcentrations
  );

  const router = useRouter();

  const onExport = async () => {
    await generateRecipe(patient, medications, 'hospitalaria');
    router.push(`/pacientes/${patient.paciente_id}`);
  };

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

          <RecetaButtons exportBtnDisabled={exportBtnDisabled}
            onPressExport={onExport} />

        </CardContent>
      </Card>
    </div>
  );
}
