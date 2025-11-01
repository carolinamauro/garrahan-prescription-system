'use client';
import { usePatients } from '@/contexts/PatientContext';
import { LoaderSpinner } from './LoaderSpinner';

export function LoaderPage({ children }) {
  const { loading } = usePatients();

  if (loading) {
    return (
      <div className="flex items-center justify-center
       w-full bg-background rounded-xl min-h-[90.9vh]">
        <div className="max-w-md w-full px-4">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
