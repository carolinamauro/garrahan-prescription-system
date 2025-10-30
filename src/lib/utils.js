import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeTwClassNames(...inputs) {
  return twMerge(clsx(inputs));
}

export function calcularEdad(fechaNacimientoStr) {
  if (!fechaNacimientoStr) return { anios: null, dias: null };

  const nacimiento = new Date(fechaNacimientoStr);
  const hoy = new Date();

  // Años completos
  let edadAnios = hoy.getFullYear() - nacimiento.getFullYear();

  // Resto uno si no pasó el cumpleaños este año
  const cumpleEsteAno = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  if (hoy < cumpleEsteAno) {
    edadAnios--;
  }

  // Calculo días restantes desde el último cumpleaños
  const ultimoCumple = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
  if (hoy < ultimoCumple) {
    ultimoCumple.setFullYear(ultimoCumple.getFullYear() - 1);
  }
  const diffMs = hoy - ultimoCumple;
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDias = Math.floor(diffMs / msPerDay);

  return { anios: edadAnios, dias: diffDias };
}

export const calcularSuperficieCorporal = (peso, altura) => {
  if (!peso || !altura) return null;
  return (peso * 4 + 7) / (peso + 90);
};
