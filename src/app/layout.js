import { ThemeProvider } from '@/components/ThemeProvider';
import { Suspense } from 'react';
import './globals.css';

export const metadata = {
  title: 'Sistema recetas oncológicas',
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
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
