import { NavTable } from '@/components/DataTable/Footer/NavTable';
import { Pagination } from '@/components/DataTable/Footer/Pagination';

export function Footer({ table }) {
  const amountPages = table.getPageCount();
  let amountSelectedRows = table.getFilteredSelectedRowModel().rows.length;
  let amountTotalRows = table.getFilteredRowModel().rows.length;

  function getCurrPage() { return table.getState().pagination.pageIndex + 1; }

  return (
    <div className="flex items-center justify-between px-4">
      {/* Selected Rows Count */}
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {`${amountSelectedRows} of ${amountTotalRows} row(s) selected.`}
      </div>

      <div className="flex w-full items-center gap-8 lg:w-fit">
        <Pagination table={table} />

        {/* Page Index */}
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {`Page ${getCurrPage()} of ${amountPages}`}
        </div>

        <NavTable table={table} />
      </div>
    </div>
  );
}
