'use client';

import * as React from 'react';
import { closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { flexRender } from '@tanstack/react-table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { DraggableRow } from '@/components/DataTable/DraggableRow';
import { getColumns } from '@/components/DataTable/TableColumns';
import { useTableConfig } from '@/components/DataTable/tableHooks';
import { Footer } from '@/components/DataTable/Footer';
import { TabOptions } from '@/components/DataTable/TabOptions';
import { TableColumnSelector } from '@/components/DataTable/TableColumnSelector';

const columns = getColumns();

export function DataTable({ data: initialData, tabsList, withActionButtons }) {
  const [data, setData] = React.useState(() => initialData);
  const table = useTableConfig(columns, data);

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      {/* Table Options */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        {tabsList && tabsList.length > 0 &&
            <div>
              <Label htmlFor="view-selector"
                className="sr-only">
                    View
              </Label>

              <TabOptions tabsList={tabsList} />
            </div>
        }

        <TableColumnSelector
          table={table}
          withActionButtons={withActionButtons}
        />
      </div>

      {/* Table Content */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}
                          colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id}
                        row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                                            No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        <Footer table={table} />
      </TabsContent>
    </Tabs>
  );
}
