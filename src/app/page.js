import { AppSidebar } from '@/components/Sidebar';
import { DataTable } from '@/components/DataTable';
import { SectionCards } from '@/components/SectionCards';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import data from './data.json';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader user={data.user}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <DataTable data={data}
                tabsList={[]} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
