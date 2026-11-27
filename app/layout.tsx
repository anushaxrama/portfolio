import type { Metadata } from 'next'
import localFonts from '../portfolio/components/localFonts.json'
import '../portfolio/styles.css'

export const metadata: Metadata = {
  icons: { icon: '/brand-icon.png' },
  title: 'Anusha Ramachandran | Product Designer + Engineer',
  description: 'Product designer and engineer combining product thinking, React, TypeScript, and frontend development to build clear interfaces and interactive prototypes.',
  openGraph: {
    title: 'Anusha Ramachandran | Product Designer + Engineer',
    description: 'Product designer and engineer combining product thinking, React, TypeScript, and frontend development to build clear interfaces and interactive prototypes.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href={localFonts['dm-sans-normal']} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={localFonts['bodoni-moda-normal']} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
