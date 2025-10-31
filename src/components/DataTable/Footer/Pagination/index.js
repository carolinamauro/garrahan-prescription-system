import { Label } from '@/components/ui/label';
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function Pagination({ table }) {
  let pageSize = table.getState().pagination.pageSize;
  const pageSizesOptions = [10, 20, 30, 40, 50];

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Label htmlFor="rows-per-page"
        className="text-sm font-medium">
                Filas por página
      </Label>
      <Select
        value={`${pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger size="sm"
          className="w-20"
          id="rows-per-page">
          <SelectValue
            placeholder={pageSize}
          />
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizesOptions.map((pageSize) => (
            <SelectItem key={pageSize}
              value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
