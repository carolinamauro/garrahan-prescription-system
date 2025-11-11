import { Suspense } from 'react';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SiteHeader } from '@/components/SiteHeader';
import { LoaderPage } from '@/components/LoaderPage';

export const metadata = { title: 'Garrahan' };

export default function RootLayout({ children }) {
  return (
    <html lang="en"
      suppressHydrationWarning>
      <body>
        <Suspense fallback={null}>
          <Providers>
            <div className="bg-background relative flex flex-1 flex-col m-4 rounded-xl shadow-sm">
              <LoaderPage>
                <SiteHeader />
                <div className="flex flex-1 flex-col min-h-[84vh]
                gap-4 py-4 md:gap-6 md:py-6 @container/main">
                  {children}
                </div>
              </LoaderPage>
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
