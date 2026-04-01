import type { Metadata } from 'next'
import { Playfair_Display, Nunito } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chizzychops & Grillz | Delicious Home-Made Meals & Grills in Lagos',
  description: 'Fresh, tasty African dishes, grills, and home-made meals delivered fast to your doorstep in Lagos. Order now via WhatsApp. 4.9-star rated restaurant in Akowonjo.',
  keywords: 'Nigerian food Lagos, African dishes delivery, grilled chicken Lagos, food delivery Akowonjo, Chizzychops, home made meals Lagos',
  openGraph: {
    title: 'Chizzychops & Grillz | Best Grills & African Dishes in Lagos',
    description: 'Deliciously made, lovingly served. Order fresh African meals & grills in Lagos.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${nunito.variable} font-body antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
