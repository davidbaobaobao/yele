import HeroSection       from '@/components/HeroSection'
import PortfolioSection  from '@/components/PortfolioSection'
import Services          from '@/components/Services'
import Capabilities      from '@/components/Capabilities'
import Pricing           from '@/components/Pricing'
import HowItWorks        from '@/components/HowItWorks'
import Testimonials      from '@/components/Testimonials'
import FAQ               from '@/components/FAQ'
import ContactSection    from '@/components/ContactSection'
import CTASection        from '@/components/CTASection'

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Portfolio */}
      <PortfolioSection />

      {/* 3 — Services / por qué elegirnos */}
      <Services />

      {/* 4 — Capabilities / lo que incluye */}
      <Capabilities />

      {/* 5 — Pricing */}
      <Pricing />

      {/* 6 — How it works */}
      <HowItWorks />

      {/* 7 — Testimonials */}
      <Testimonials />

      {/* 8 — FAQ */}
      <FAQ />

      {/* 9 — Contact */}
      <ContactSection />

      {/* 10 — CTA hero */}
      <CTASection />
    </>
  )
}
