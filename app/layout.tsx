import type { Metadata } from 'next'
import { Newsreader, Inter } from 'next/font/google'
import './globals.css'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileDock from '@/components/MobileDock'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-inter',
  adjustFontFallback: false,
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yele.design'),
  title: 'Yele | Tu página web profesional desde 19,90 €/mes',
  description:
    'Webs profesionales para autónomos y pequeños negocios en España. Diseño a medida, sin inversión inicial, lista en 3 días. Desde 19,90 €/mes sin permanencia.',
  openGraph: {
    title: 'Yele — Tu web profesional desde 19,90 €/mes',
    description: 'Sin letras pequeñas. Sin pago inicial. Diseño a medida para tu negocio en 3 días.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yele — Tu web profesional desde 19,90 €/mes',
    description: 'Sin letras pequeñas. Sin pago inicial. Diseño a medida para tu negocio en 3 días.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://yele.design',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${newsreader.variable} ${inter.variable}`}>
      <body>
        {/* Washi grain texture — fixed overlay */}
        <div className="washi-texture" aria-hidden="true" />

        {/* Skip link — accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Navigation />

        <main id="main-content">
          {children}
        </main>

        <Footer />
        <MobileDock />
      </body>
    </html>
  )
}
