'use client';
import { AppSidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePatients } from '@/contexts/PatientContext';

export default function PatientsPage() {
  const { patients } = usePatients();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={'Pacientes'}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable
                data={patients}
                tabsList={[]}
                withActionButtons={true}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
