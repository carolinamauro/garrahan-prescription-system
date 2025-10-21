'use client';
import { AppSidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { SectionCards } from '@/components/SectionCards';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePatients } from '@/contexts/PatientContext';

export default function Page() {
  const { patients } = usePatients();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={'Inicio'}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <DataTable data={patients}
                tabsList={[]} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
