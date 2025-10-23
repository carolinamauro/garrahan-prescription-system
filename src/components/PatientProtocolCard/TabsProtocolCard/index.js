import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export function TabsProtocolCard() {
  return (
    <Tabs defaultValue="resumen"
      className="w-full">
      <TabsList>
        <TabsTrigger value="resumen">Resumen</TabsTrigger>
        <TabsTrigger value="detalle">Detalle</TabsTrigger>
      </TabsList>
      <TabsContent value="detalle"
        className="mt-6">
        <div className="flex min-h-[300px] items-center
              justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
                            Aún no hay información para mostrar
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-[28vw]
                  text-center mx-auto break-words whitespace-normal">
                            Una vez selecciones un protocolo de tratamiento,
                            verás acá un resumen de ciclos, semanas y estado del tratamiento
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
