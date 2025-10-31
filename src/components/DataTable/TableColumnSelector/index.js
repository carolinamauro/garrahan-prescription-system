import { IconChevronDown,
  IconLayoutColumns,
  IconPlus,
  IconAdjustmentsAlt
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function TableColumnSelector({ table, withActionButtons }) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"
            size="sm">
            <IconLayoutColumns />
            <span className="hidden lg:inline">Seleccionar columnas</span>
            <span className="lg:hidden">Columnas</span>
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start"
          className="w-56">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' &&
                                column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      {withActionButtons && (
        <>
          <Button size="sm"
            asChild>
            <Link href="/pacientes/new">
              <>
                <IconPlus />
                <span className="hidden lg:inline">Agregar paciente</span>
              </>
            </Link>
          </Button>

          <Button size="sm">
            <IconAdjustmentsAlt />
            <span className="hidden lg:inline">Filtrar</span>
          </Button>
        </>
      )}
    </div>
  );
}
