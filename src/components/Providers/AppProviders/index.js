import { LoginProvider } from '@/contexts/LoginContext';
import { PatientsProvider } from '@/contexts/PatientContext';
import { SelectedPatientProvider } from '@/contexts/SelectedPatientContext';

export function AppProviders({ children }) {
  return (
    <LoginProvider>
      <PatientsProvider>
        <SelectedPatientProvider>
          {children}
        </SelectedPatientProvider>
      </PatientsProvider>
    </LoginProvider>
  );
}
