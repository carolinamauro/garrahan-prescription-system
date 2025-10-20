import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MousePointerClick, FileText } from 'lucide-react';

function tieneSuperficieCorporal(sup_corporal) {
  return Boolean(sup_corporal && String(sup_corporal).trim() !== '');
}

export function PatientProtocolCard({ patient, tieneProtocolo }) {
  const canSelectProtocol = tieneSuperficieCorporal(patient.sup_corporal);

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Protocolo de tratamiento</CardTitle>
          <CardDescription className={!tieneProtocolo ? 'text-red-500' : ''}>
            {tieneProtocolo ? `${patient.protocolo}` : 'No tiene protocolo asignado'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button disabled={!canSelectProtocol}>
              <MousePointerClick className="mr-2 h-4 w-4" />
                            Seleccionar protocolo
            </Button>
            <Button variant="outline"
              disabled={!tieneProtocolo}>
              <FileText className="mr-2 h-4 w-4" />
                            Generar receta
            </Button>
          </div>

          <Tabs defaultValue="resumen"
            className="w-full">
            <TabsList>
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
              <TabsTrigger value="detalle">Detalle</TabsTrigger>
            </TabsList>
            <TabsContent value="detalle"
              className="mt-6">
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-lg font-medium text-muted-foreground">
                                        Aún no hay información para mostrar
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                                        Selecciona un miembro del equipo para ver información detallada
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
