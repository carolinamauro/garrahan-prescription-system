'use client';

import { useState } from 'react';
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';

export const ActionCell = ({ handleEdit, handleDelete }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const onDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const onConfirmDelete = () => {
    setShowDeleteAlert(false);
    if (handleDelete) {
      handleDelete();
    }
  };

  // Si solo hay handleDelete (medications), mostrar botón simple con icono de trash
  if (!handleEdit && handleDelete) {
    return (
      <>
        <div className="flex justify-end pr-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 size-8 p-0"
            onClick={onDeleteClick}
          >
            <IconTrash className="size-4" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>

        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará la droga de la receta. 
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={onConfirmDelete} 
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  // Si hay ambos (patients), mostrar dropdown menu
  return (
    <>
      <div className="flex justify-end pr-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8 p-0"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"
            className="w-32">
            {handleEdit && <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>}
            {handleEdit && handleDelete && <DropdownMenuSeparator />}
            {handleDelete && (
              <DropdownMenuItem variant="destructive"
                onClick={onDeleteClick}>Eliminar</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la droga de la receta. 
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirmDelete} 
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
