import { useEffect, useState, useCallback, useMemo } from 'react';
import { getMedicationColumns } from '@/components/DataTable/TableColumns';
import { useRecipeGenerator } from '@/app/pacientes/new/hooks/useRecipeGenerator';
import { useRouter } from 'next/navigation';
import { calculateDrug, getCurrentProtocol, getPresentationsByDrug } from '@/services/medications';
import { updateProtocoloPaciente } from '@/services/protocolos';
import { searchExternalPatient } from '@/services/pacientes';

export function useMedications(patient, setRecipes) {
  const [medications, setMedications] = useState([]);
  const [presentationsByDrug, setPresentationsByDrug] = useState({});
  const [selectedForms, setSelectedForms] = useState({});
  const [availableConcentrations, setAvailableConcentrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [exportBtnDisabled, setExportBtnDisabled] = useState(true);
  const [tipoReceta, setTipoReceta] = useState('hospitalaria');
  const [camposExtra, setCamposExtra] = useState({ estadio: '', intervalo: '', ps: '', tnm: '' });

  const router = useRouter();
  const { generateRecipe } = useRecipeGenerator();

  const shouldEnableExportButton = useCallback(
    (meds, maybeTipoReceta) => {
      // Usamos el tipoReceta pasado o, si no viene, el estado `tipoReceta`
      const tr = maybeTipoReceta ?? tipoReceta;

      const targetMeds = meds ?? medications;
      const tieneTodosLosCampos = (targetMeds || []).every(
        (m) =>
          (m.presentation ?? '') !== '' &&
          (m.concentration ?? '') !== '' &&
          (m.needed_amount ?? '') !== ''
      );

      // Si es provincia, además requerimos camposExtra completos
      if (tr === 'provincia') {
        const tieneTodosLosCamposExtra = Object.values(camposExtra).every((v) => v !== '');
        return tieneTodosLosCampos && tieneTodosLosCamposExtra;
      }
      return tieneTodosLosCampos;
    },
    [tipoReceta, camposExtra, medications]
  );

  // Recalcula automáticamente el estado del botón de exportar cuando cambien los datos relevantes
  useEffect(() => {
    setExportBtnDisabled(!shouldEnableExportButton(medications, tipoReceta));
  }, [medications, tipoReceta, camposExtra, shouldEnableExportButton]);

  useEffect(() => {
    if (!patient) return;

    const fetchData = async () => {
      try {
        const protocolo = await getCurrentProtocol(patient.paciente_id);
        const meds = protocolo.administraciones.map((admin) => ({
          id: admin.admin_id,
          droga_id: admin.droga_id,
          nombre: admin.nombre_droga,
          administracion_id: admin.admin_id,
          presentation: '',
          concentration: '',
          concentrationData: null,
          needed_amount: '',
          onCalculate: handleCalculate,
          isRemovable: true,
        }));

        setMedications(meds);

        // Fetch presentations de cada droga
        const allPresentations = await Promise.all(
          meds.map((m) => getPresentationsByDrug(m.droga_id))
        );

        const presentationsMap = {};
        meds.forEach((m, i) => {
          const presentations = allPresentations[i];
          const uniqueForms = [...new Set(presentations.map((p) => p.forma_farmaceutica_nombre))];
          presentationsMap[m.droga_id] = presentations;

          // Autoselección cuando hay única forma/concentración
          if (uniqueForms.length === 1 && presentations.length === 1) {
            handlePresentationChange(m.id, uniqueForms[0]);
          }
        });

        setPresentationsByDrug(presentationsMap);
      } catch (err) {
        console.error('Error fetching medications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patient?.paciente_id]);

  // --- Handlers ---
  const handlePresentationChange = useCallback(
    (id, forma_farmaceutica_nombre) => {
      const medication = medications.find((m) => m.id === id);
      if (!medication) return;

      const allPres = presentationsByDrug[medication.droga_id] || [];
      const filtered = allPres.filter(
        (p) => p.forma_farmaceutica_nombre === forma_farmaceutica_nombre
      );

      setSelectedForms((prev) => ({ ...prev, [id]: forma_farmaceutica_nombre }));
      setAvailableConcentrations((prev) => ({ ...prev, [id]: filtered }));

      const updated = medications.map((m) =>
        m.id === id
          ? {
            ...m,
            presentation: forma_farmaceutica_nombre,
            concentration:
                filtered.length === 1
                  ? `${filtered[0].fuerza_valor} ${filtered[0].fuerza_unidad}`
                  : '',
            // Añadimos los datos de concentración cuando hay una única opción
            concentrationData: filtered.length === 1 ? filtered[0] : null
          }
          : m
      );
      setMedications(updated);
      setExportBtnDisabled(!shouldEnableExportButton(updated));
    },
    [medications, presentationsByDrug, shouldEnableExportButton]
  );

  const handleConcentrationChange = useCallback(
    (id, presentacion) => {
      const updated = medications.map((m) =>
        m.id === id
          ? {
            ...m,
            concentration: `${presentacion.fuerza_valor} ${presentacion.fuerza_unidad}`,
            concentrationData: presentacion,
            needed_amount: '',
          }
          : m
      );
      setMedications(updated);
      setExportBtnDisabled(!shouldEnableExportButton(updated));
    },
    [medications, shouldEnableExportButton]
  );

  const handleCalculate = useCallback(
    async (med) => {
      try {
        const result = await calculateDrug({
          administracion_id: med.administracion_id,
          peso: patient.peso,
          nueva_fuerza_valor: med.concentrationData.fuerza_valor,
          nueva_fuerza_unidad: med.concentrationData.fuerza_unidad,
          nombre_droga: med.nombre,
        });

        setMedications((prev) => {
          const updated = prev.map((m) =>
            m.id === med.id
              ? {
                ...m,
                dosis_diaria: result.dosis_diaria,
                total_dosis_amount: result.cantidad_total.valor,
                total_dosis_unit: result.cantidad_total.unidad,
                total_units: result.unidades,
                needed_amount:
                    `${result.cantidad_total.valor} ${result.cantidad_total.unidad} 
                    (${result.unidades} unidades)`,
              }
              : m
          );

          setExportBtnDisabled(!shouldEnableExportButton(updated));
          return updated;
        });
      } catch (err) {
        console.error('Error al calcular droga:', err);
      }
    },
    [patient, shouldEnableExportButton]
  );

  const handleDelete = useCallback(
    (id) => () => {
      setMedications((prev) => prev.filter((m) => m.id !== id));
    },
    []
  );

  const onExport = useCallback(
    async () => {
      try {
        const updatedPatient = await searchExternalPatient(patient.id_hospitalario);
        await generateRecipe({metaData: updatedPatient, patient},
          medications, tipoReceta, setRecipes, camposExtra);
        await updateProtocoloPaciente(patient.paciente_id);
        router.push(`/pacientes/${patient.paciente_id}`);
      } catch (err) {
        console.error('Error al generar receta:', err);
      }
    },
    [patient, medications, tipoReceta, setRecipes, camposExtra, router, generateRecipe]
  );

  const columns = useMemo(
    () =>
      getMedicationColumns(
        handlePresentationChange,
        handleDelete,
        presentationsByDrug,
        handleConcentrationChange,
        selectedForms,
        availableConcentrations
      ),
    [
      handlePresentationChange,
      handleDelete,
      presentationsByDrug,
      handleConcentrationChange,
      selectedForms,
      availableConcentrations,
    ]
  );

  return {
    loading,
    medications,
    handlers: {
      handlePresentationChange,
      handleConcentrationChange,
      handleCalculate,
      handleDelete,
      onExport,
    },
    uiState: {
      exportBtnDisabled,
      columns,
      cycles: 1,
    },
    tipoReceta,
    setTipoReceta,
    camposExtra,
    setCamposExtra,
    shouldEnableExportButton
  };
}
