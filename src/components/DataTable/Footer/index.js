import { NavTable } from '@/components/DataTable/Footer/NavTable';
import { Pagination } from '@/components/DataTable/Footer/Pagination';

export function Footer({ table, withSelectedRowsCount }) {
  const amountPages = Math.max(table.getPageCount(), 1);
  let amountSelectedRows = table.getFilteredSelectedRowModel().rows.length;
  let amountTotalRows = table.getFilteredRowModel().rows.length;
  let totalRowsText = amountTotalRows === 1 ? 'fila' : 'filas';
  let totalSelectedRowsText = amountTotalRows === 1 ? 'seleccionada' : 'seleccionadas';

  function getCurrPage() { return table.getState().pagination.pageIndex + 1; }

  return (
    <div className="flex items-center justify-between px-1">
      {/* Selected Rows Count */}
      {withSelectedRowsCount ?
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {`${amountSelectedRows} de ${amountTotalRows} ${totalRowsText} ${totalSelectedRowsText}`}
        </div>

        :

        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {`${amountTotalRows} ${totalRowsText} en total`}
        </div>
      }

      <div className="flex w-full items-center gap-8 lg:w-fit">
        <Pagination table={table} />

        {/* Page Index */}
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {`Página ${getCurrPage()} de ${amountPages}`}
        </div>

        <NavTable table={table} />
      </div>
    </div>
  );
}
