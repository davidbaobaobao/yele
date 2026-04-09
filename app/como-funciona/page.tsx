import type { Metadata } from 'next'
import HowItWorks from '@/components/HowItWorks'

export const metadata: Metadata = {
  title: 'Cómo funciona | Yele',
  description: 'De cero a publicado en 3 días. Así es el proceso de Yele.',
}

export default function ComoFuncionaPage() {
  return <HowItWorks />
}
