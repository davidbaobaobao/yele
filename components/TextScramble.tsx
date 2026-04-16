'use client'

import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export function TextScramble({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    let frame = 0
    const totalFrames = 16
    const id = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      let scrambled = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { scrambled += ' '; continue }
        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(scrambled)
      if (frame >= totalFrames) {
        clearInterval(id)
        setDisplay(text)
      }
    }, 40)
    return () => clearInterval(id)
  }, [text])

  return <span className={className}>{display}</span>
}
