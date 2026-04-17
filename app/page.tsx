import Hero       from '@/components/Hero'
import CoreValues  from '@/components/sections/CoreValues'
import WebsiteGrid from '@/components/sections/WebsiteGrid'
import Services    from '@/components/sections/Services'
import Pricing     from '@/components/sections/Pricing'
import Process     from '@/components/sections/Process'
import FAQContact  from '@/components/sections/FAQContact'
import FinalCTA    from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <main>
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Core values */}
      <CoreValues />

      {/* 3 — Website examples grid */}
      <WebsiteGrid />

      {/* 4 — Service offering */}
      <Services />

      {/* 5 — Pricing */}
      <Pricing />

      {/* 6 — Process timeline */}
      <Process />

      {/* 7 — FAQ + Contact */}
      <FAQContact />

      {/* 8 — Final CTA */}
      <FinalCTA />
    </main>
  )
}
