import {Checkbox} from '@/components/ui/checkbox';

export const SelectHeader = ({ table }) => (
  <div className="flex items-center justify-center">
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  </div>
);
