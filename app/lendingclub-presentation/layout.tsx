import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-lc-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-lc-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anusha Ramachandran — LendingClub Interview Deck',
  description:
    'Interactive walkthrough of Nexus, NeuraNote, and FlowOps for Product & Experience—full case-study structure and portfolio visuals.',
}

export default function LendingClubPresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${dmSans.variable} ${fraunces.variable} min-h-screen bg-[#f3f0e8] text-[#14231f] antialiased`}
    >
      {children}
    </div>
  )
}
