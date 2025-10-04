import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mergeTwClassNames(...inputs) {
  return twMerge(clsx(inputs))
}
