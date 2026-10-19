import type { Metadata, Viewport } from 'next';
import { business } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: 'Tu Mano Derecha | Sistemas, Inteligencia y Dirección Empresarial', template: '%s | Tu Mano Derecha' },
  description: 'Sistemas de gestión, inteligencia de negocios y acompañamiento a la dirección empresarial en Latinoamérica. Convierte información en mejores decisiones.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'es_MX', siteName: business.name, url: '/', title: 'Tu Mano Derecha | Sistemas, Inteligencia y Dirección Empresarial', description: 'Organizamos tus sistemas, analizamos tus resultados y te acompañamos a tomar decisiones con dirección.' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#074953' };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="es"><body>{children}</body></html>;
}
