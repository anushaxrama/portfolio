'use client'

import { useEffect, useRef } from 'react'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current || typeof window === 'undefined') return

    const initVanta = async () => {
      try {
        const THREE = await import('three')
        const VANTA = await import('vanta/dist/vanta.dots.min.js')

        if (vantaEffect.current) {
          try {
            vantaEffect.current.destroy()
          } catch (e) {
            // Ignore cleanup errors
          }
          vantaEffect.current = null
        }

        if (!vantaRef.current) return

        vantaEffect.current = (VANTA as any).default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          color2: 0xffffff,
          backgroundColor: 0x0,
          size: 2.0,
          spacing: 25.0,
          showLines: false,
        })
      } catch (error) {
        console.error('Error loading Vanta:', error)
      }
    }

    initVanta()

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (e) {
          // Ignore cleanup errors
        }
        vantaEffect.current = null
      }
    }
  }, [])

  return <div ref={vantaRef} className="fixed inset-0 w-full h-full -z-10" />
}

