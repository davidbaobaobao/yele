import type { Metadata } from 'next'
import Pricing from '@/components/sections/Pricing'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Precios | Yele',
  description: 'Planes desde 19 €/mes. Sin pago inicial, sin permanencia. Diseño web profesional para tu negocio.',
}

export default function PreciosPage() {
  return (
    <>
      <div style={{ paddingTop: '60px' }} />
      <Pricing />
      <FinalCTA />
    </>
  )
}
