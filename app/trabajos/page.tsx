import type { Metadata } from 'next'
import Projects from '@/components/Projects'

export const metadata: Metadata = {
  title: 'Trabajos | Yele',
  description: 'Ejemplos de webs diseñadas para negocios reales en España. Cada sector tiene su propio diseño.',
}

export default function TrabajosPage() {
  return <Projects />
}
