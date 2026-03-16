import { DM_Sans, Playfair_Display } from 'next/font/google'

export const metadata = {
  title: 'Case Study for Crusoe | Nexus',
  description: 'Anusha Ramachandran - Making multi-model AI invisible. One question, one answer you can trust.',
}

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-playfair',
})

export default function CrusoeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${dmSans.className} ${playfair.variable}`}>
      {children}
    </div>
  )
}
