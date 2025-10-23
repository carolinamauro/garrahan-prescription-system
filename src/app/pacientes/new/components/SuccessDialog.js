'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

export default function SuccessDialog({ open, onOpenChange, onAccept }) {
  return (
    <AlertDialog open={open}
      onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Paciente creado</AlertDialogTitle>
          <AlertDialogDescription>
            El paciente fue creado correctamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onAccept}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
