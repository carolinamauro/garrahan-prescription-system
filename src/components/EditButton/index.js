import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePen } from 'lucide-react';

export function EditButton({ patientId, disabled }) {
  return (
    <div className="flex items-end">
      <Button disabled={disabled}>
        <Link
          href={`/pacientes/${patientId}/editar`}
          className="flex items-center gap-2"
          aria-label={`${patientId} - Editar`}
        >
          <FilePen className="mr-2 h-4 w-4" />
                  Editar
        </Link>
      </Button>
    </div>
  );
}
