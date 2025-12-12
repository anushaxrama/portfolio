'use client'

import { useState } from 'react'
import VantaBackground from '@/components/VantaBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import RecentWork from '@/components/RecentWork'
import SplashScreen from '@/components/SplashScreen'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {/* Main content always rendered underneath */}
      <main className="relative min-h-screen">
        <VantaBackground />
        <Navbar />
        <Hero />
        <RecentWork />
      </main>
      
      {/* Splash screen overlays and fades out */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
    </>
  )
}

