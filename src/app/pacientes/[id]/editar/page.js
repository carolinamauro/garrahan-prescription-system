import { AppSidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import data from '../data.json';
import { PatientSummaryCard } from '@/components/PatientSummaryCard';
import { PatientEditCard } from '@/components/PatientEditCard';

export default function PatientPage({ params }) {
  const { id } = params;
  const patient = data.find((p) => String(p.id) === String(id));

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={`Paciente: ${patient.nombre}`} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <PatientSummaryCard patient={patient}
                withEditButton={false} />
              <PatientEditCard patient={patient} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
