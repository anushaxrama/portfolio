'use client'

import VantaBackground from '@/components/VantaBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import RecentWork from '@/components/RecentWork'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <VantaBackground />
      <Navbar />
      <Hero />
      <RecentWork />
    </main>
  )
}
