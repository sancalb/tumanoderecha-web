
import type { Metadata, Viewport } from 'next';
import { business } from '@/lib/site';
import './globals.css';

const title =
  'Tu Mano Derecha | Sistemas, Inteligencia y Dirección Empresarial';

const description =
  'Sistemas de gestión, inteligencia de negocios y acompañamiento a la dirección empresarial en Latinoamérica. Convierte información en mejores decisiones.';

export const metadata: Metadata = {
  metadataBase: new URL(business.url),

  title: {
    default: title,
    template: '%s | Tu Mano Derecha',
  },

  description,

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: [
      {
        url: '/images/Icono Principal_tmd.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/Icono Principal_tmd.png',
        type: 'image/png',
      },
    ],
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: business.name,
    url: '/',
    title,
    description:
      'Organizamos tus sistemas, analizamos tus resultados y te acompañamos a tomar mejores decisiones.',
    images: [
      {
        url: '/images/Icono Principal_tmd.png',
        alt: 'Tu Mano Derecha',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/images/Icono Principal_tmd.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#074953',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
