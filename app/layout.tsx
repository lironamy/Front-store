import type { Metadata } from 'next'
import { Rubik  } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const font = Rubik ({   weight: '400',
subsets: ['latin'], })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Ⓒ 2023 Liron Lin Avraham',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />  
      </body>
    </html>
  )
}
