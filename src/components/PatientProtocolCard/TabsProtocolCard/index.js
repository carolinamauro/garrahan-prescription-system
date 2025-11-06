import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/DataTable';
import { getProtocolColumns } from '@/components/DataTable/TableColumns';

export function TabsProtocolCard({ recetasSolicitadas, tieneProtocolo, loggedIn }) {
  const divClass = 'flex min-h-[300px] items-center justify-center rounded-lg border border-dashed';
  const oracionInicial = tieneProtocolo ?
    'Una vez inicies sesión' :
    'Una vez selecciones un protocolo de tratamiento';

  return (
    tieneProtocolo && loggedIn ?
      <Tabs defaultValue="resumen"
        className="w-full">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="detalle">Detalle</TabsTrigger>
        </TabsList>
        <TabsContent value="detalle"
          className="mt-3">
          <div className="flex min-h-[30vh] items-center
              justify-center rounded-lg border border-dashed max-w-[35rem] p-4">
            <img
              src="/protocolo.png"
              alt="Esquema de tratamiento PROTOCOLO GBTO OSTEOSSARCOMA 2006"
              className="w-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="resumen"
          className="mt-3">
          <div className="[&_div]:!pl-0">
            {tieneProtocolo && (
              <DataTable
                data={recetasSolicitadas}
                tabsList={[]}
                withActionButtons={false}
                withTableColumnSelector={false}
                withSelectedRowsCount={false}
                columns={getProtocolColumns()}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      :
      <div className={divClass}>
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">
                  Aún no hay información para mostrar
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-[24rem]
                  text-center mx-auto break-words whitespace-normal">
            {oracionInicial}, verás acá un resumen de ciclos, semanas y estado del tratamiento
          </p>
        </div>
      </div>
  );
}
