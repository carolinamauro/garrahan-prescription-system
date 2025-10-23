import { ThemeProvider } from '@/components/ThemeProvider';
import { PatientsProvider } from '@/contexts/PatientContext';
import { HeaderProvider } from '@/contexts/HeaderContext';
import { Suspense } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Garrahan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"
      suppressHydrationWarning>
      <body>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <PatientsProvider>
              <HeaderProvider>
                <div className="bg-background relative flex
                flex-1 flex-col m-4 rounded-xl shadow-sm">
                  <SiteHeader />
                  {children}
                </div>
              </HeaderProvider>
            </PatientsProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
