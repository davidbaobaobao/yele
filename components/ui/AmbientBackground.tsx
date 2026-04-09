'use client'

// Ink Wash Cloud — replaces old colorful blobs with washi-style ink wash
interface AmbientBackgroundProps {
  variant?: 'default' | 'amber'
  className?: string
}

export default function AmbientBackground({ variant: _variant = 'default', className = '' }: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Ink wash cloud — bottom left */}
      <div
        className="absolute rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(28,28,24,0.07) 0%, rgba(252,249,243,0) 70%)',
          animation: 'ink_wash 6s ease-in-out infinite',
        }}
      />
      {/* Ink wash cloud — top right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '40vw',
          height: '40vw',
          top: '-5%',
          right: '-5%',
          filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(28,28,24,0.05) 0%, rgba(252,249,243,0) 70%)',
          animation: 'ink_wash 8s ease-in-out infinite 1.5s',
        }}
      />
    </div>
  )
}
