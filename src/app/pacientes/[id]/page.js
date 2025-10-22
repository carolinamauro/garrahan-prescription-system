'use client';
import React from 'react';
import { AppSidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';
import { usePatients } from '@/contexts/PatientContext';

function pacienteTieneProtocolo(protocolo) {
  return Boolean(protocolo && String(protocolo).trim() !== '');
}

export default function PatientPage({ params }) {
  const { id } = React.use(params);
  const { patients } = usePatients();
  const patient = patients.find((p) => String(p.id) === String(id));
  const tieneProtocolo = pacienteTieneProtocolo(patient.protocolo);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={`Paciente: ${patient.nombre}`} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <PatientSummaryCard patient={patient}
                withEditButton={true} />
              <PatientProtocolCard patient={patient}
                tieneProtocolo={tieneProtocolo} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
