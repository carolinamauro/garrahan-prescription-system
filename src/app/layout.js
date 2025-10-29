import { ThemeProvider } from '@/components/ThemeProvider';
import { PatientsProvider } from '@/contexts/PatientContext';
import { HeaderProvider } from '@/contexts/HeaderContext';
import { Suspense } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { LoaderPage } from '@/components/LoaderPage';
import { LoginProvider } from '@/contexts/LoginContext';

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
            <LoginProvider>
              <PatientsProvider>
                <HeaderProvider>
                  <div className="bg-background relative flex
                flex-1 flex-col m-4 rounded-xl shadow-sm">
                    <LoaderPage>
                      <SiteHeader />
                      <div className="flex flex-1 flex-col min-h-[84vh]">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {children}
                          </div>
                        </div>
                      </div>
                    </LoaderPage>
                  </div>
                </HeaderProvider>
              </PatientsProvider>
            </LoginProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
