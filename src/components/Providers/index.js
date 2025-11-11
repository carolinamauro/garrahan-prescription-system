import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { HeaderProvider } from '@/contexts/HeaderContext';
import { AppProviders } from './AppProviders';

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeaderProvider>
        <AppProviders>{children}</AppProviders>
      </HeaderProvider>
    </ThemeProvider>
  );
}
