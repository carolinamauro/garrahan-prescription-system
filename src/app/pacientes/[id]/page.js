import { AppSidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MousePointerClick, FileText, FilePen } from 'lucide-react';

import data from './data.json';

function tieneSuperficieCorporal(sup_corporal) {
  return Boolean(sup_corporal && String(sup_corporal).trim() !== '');
}

export default function PatientPage() {
  let tieneProtocolo = false;
  let patientData = data[0];

  // TODO: Refactorizar en componentes más chicos
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={`Paciente: ${patientData.nombre}`} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Summary Section */}
              <div className="px-4 lg:px-6">
                <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
                <Card>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-6 place-items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Edad</p>
                        <p className="mt-1 font-medium">{patientData.anios} años y {patientData.dias} días</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Peso</p>
                        <p className="mt-1 font-medium">{patientData.peso || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Superficie corporal</p>
                        <p className="mt-1 font-medium">{patientData.sup_corporal || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Obra social</p>
                        <p className="mt-1 font-medium">{patientData.obra_social || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Historia clínica</p>
                        <p className="mt-1 font-medium">{patientData.historia_clinica}</p>
                      </div>
                      <div className="flex items-end">
                        <Button>
                          <FilePen className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Management Section */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Protocolo de tratamiento</CardTitle>
                    {/* TODO: Poner esto en rojo si no hay protocolo asignado*/}
                    <CardDescription>No tiene protocolo asignado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex gap-2">
                      <Button disabled={!tieneSuperficieCorporal(patientData.sup_corporal)}>
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
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
