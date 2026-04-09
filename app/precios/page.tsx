import type { Metadata } from 'next'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Precios | Yele',
  description: 'Planes desde 19,90 €/mes. Sin pago inicial, sin permanencia. Diseño web profesional para tu negocio.',
}

export default function PreciosPage() {
  return <Pricing />
}
