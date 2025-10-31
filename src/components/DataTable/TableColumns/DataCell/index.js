'use client';

export function DataCell({ content }) {
  return (
    <span>{content ?? '-'}</span>
  );
}
