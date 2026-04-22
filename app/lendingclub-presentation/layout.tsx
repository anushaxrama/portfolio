import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import Script from 'next/script'

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
      className={`${dmSans.variable} ${fraunces.variable} min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased`}
    >
      <Script id="lc-reset-scroll" strategy="beforeInteractive">
        {`(() => {
  const resetToIntro = () => {
    try {
      history.scrollRestoration = 'manual';
    } catch {}

    const cleanPath = location.pathname + location.search;
    if (location.hash) {
      history.replaceState(history.state, '', cleanPath);
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  resetToIntro();
  requestAnimationFrame(resetToIntro);
  window.addEventListener('pageshow', resetToIntro);
})();`}
      </Script>
      {children}
    </div>
  )
}
