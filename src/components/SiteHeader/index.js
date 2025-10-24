'use client';

import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavUser } from '@/components/SiteHeader/NavUser';
import SearchPatient from '@/components/SearchPatient';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { useHeader } from '@/contexts/HeaderContext';
import { usePatients } from '@/contexts/PatientContext';
import Link from 'next/link';

export function SiteHeader() {
  const user = {
    name: 'Amirul Haque',
    email: 'Oncólogo - Prescriptor',
    avatar: '/avatars/shadcn.jpg',
  };

  const { title, subtitle } = useHeader();
  const { patients } = usePatients();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">

        <div className="flex items-center gap-2">
          <Link href="/"
            aria-label="Home">
            <img
              src="/menu_icon.svg"
              alt="logo"
              className="w-8 h-8"
            />
          </Link>

          <Separator orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4" />
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-blue-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex justify-center flex-1">
          <div className="w-full max-w-sm">
            <SearchPatient
              placeholder="Buscar paciente..."
              options={patients}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NotificationsDropdown />
          <ThemeToggle />
          <NavUser user={user} />
        </div>

      </div>
    </header>
  );
}
