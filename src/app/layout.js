import { DM_Sans } from 'next/font/google';
import './globals.css';
import Layout from '../components/Layout';
import { HeaderProvider } from '@/app/contexts/HeaderContext';

const dmSans = DM_Sans({
    weight: ['500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body className={dmSans.className}>
        <HeaderProvider>
            <Layout>
                {children}
            </Layout>
        </HeaderProvider>
        </body>
        </html>
    );
}
