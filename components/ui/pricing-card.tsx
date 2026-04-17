"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  tagline: string
  price: string
  priceDescription: string
  description?: string
  features: string[]
  buttonText: string
  href: string
  imageSrc?: string
  imageAlt?: string
  highlighted?: boolean
  badge?: string
}

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0px 15px 30px -5px rgba(0,0,0,0.12)",
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
}

const imageVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: -5,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({
    className,
    title,
    tagline,
    price,
    priceDescription,
    description,
    features,
    buttonText,
    href,
    imageSrc,
    imageAlt,
    highlighted = false,
    badge,
    style,
    ...props
  }, ref) => {
    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative flex flex-col justify-between rounded-xl border p-6 shadow-sm transition-shadow duration-300",
          highlighted
            ? "border-[var(--color-accent)] bg-white"
            : "border-gray-200 bg-white",
          className
        )}
        style={style}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
      >
        {/* Badge */}
        {badge && (
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-accent)',
            color: 'var(--color-dark)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 14px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)',
          }}>
            {badge}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Header row: title/price left, image right */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: 'var(--color-dark)',
                lineHeight: 1.2,
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'var(--color-fog)',
                marginTop: '2px',
                letterSpacing: '0.03em',
                fontFamily: 'var(--font-body)',
              }}>
                {tagline}
              </p>
              <div style={{ marginTop: '12px' }}>
                <span style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-dark)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  {price}
                </span>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--color-fog)',
                  marginTop: '4px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {priceDescription}
                </p>
              </div>
            </div>

            {imageSrc && (
              <motion.img
                src={imageSrc}
                alt={imageAlt || title}
                width={80}
                height={80}
                style={{ objectFit: 'contain', flexShrink: 0 }}
                variants={imageVariants}
              />
            )}
          </div>

          {/* Description */}
          {description && (
            <p style={{
              fontSize: '14px',
              color: 'var(--color-fog)',
              lineHeight: 1.65,
              fontFamily: 'var(--font-body)',
            }}>
              {description}
            </p>
          )}

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />

          {/* Features */}
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '4px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2
                  size={16}
                  color="var(--color-accent)"
                  strokeWidth={2}
                  style={{ flexShrink: 0 }}
                />
                <span style={{
                  fontSize: '14px',
                  color: 'var(--color-dark)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div style={{ marginTop: '28px' }}>
          <a href={href} style={{ display: 'block', textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                height: '48px',
                background: highlighted ? 'var(--color-accent)' : 'var(--color-dark)',
                color: highlighted ? 'var(--color-dark)' : 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.opacity = '0.88' }}
              onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
            >
              {buttonText}
            </button>
          </a>
        </div>
      </motion.div>
    )
  }
)
PricingCard.displayName = "PricingCard"
