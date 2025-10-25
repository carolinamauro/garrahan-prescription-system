import { FileText, MousePointerClick, FilePen } from 'lucide-react';
import { LinkButton } from '@/components/LinkButton';

export function ActionButtonsProtocol({ patientId, tieneProtocolo, tieneSupCorporal }) {
  return (
    <div className="mb-4 flex gap-2">
      <LinkButton
        href={`/pacientes/${patientId}/seleccionar-protocolo`}
        disabled={!tieneSupCorporal}
        btnText="Seleccionar protocolo"
        icon={MousePointerClick}
        variant=""
      />

      <LinkButton
        href={`/pacientes/${patientId}/generar-receta`}
        disabled={!tieneProtocolo || !tieneSupCorporal}
        btnText="Generar receta"
        icon={FileText}
        variant="outline"
      />

      {tieneProtocolo && (
        <LinkButton
          href={`/pacientes/${patientId}/editar-protocolo`}
          disabled={!tieneProtocolo}
          btnText="Editar protocolo"
          icon={FilePen}
          variant="outline"
        />
      )}
    </div>
  );
}
