import { AppSidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import data from './data.json';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientProtocolCard } from '@/components/PatientProtocolCard';

export default function PatientPage() {
  const patient = data[0];
  const tieneProtocolo = false;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={`Paciente: ${patient.nombre}`} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <PatientSummaryCard patient={patient} />
              <PatientProtocolCard patient={patient}
                tieneProtocolo={tieneProtocolo} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
