import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavUser } from '@/components/SiteHeader/NavUser';
import { Input } from '@/components/ui/input';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import Link from 'next/link';

export function SiteHeader({ title }) {
  const user = {
    name: 'Amirul Haque',
    email: 'Oncólogo - Prescriptor',
    avatar: '/avatars/shadcn.jpg',
  };

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
          <h1 className="text-base font-medium">{title}</h1>
        </div>

        <div className="flex justify-center flex-1">
          <div className="w-full max-w-sm">
            <Input placeholder="Buscar paciente..." />
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
