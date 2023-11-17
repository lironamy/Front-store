import type { Metadata } from 'next'
import { Rubik  } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ToastProvider from '@/providers/toast-provider'
import ModalProvider from '@/providers/modal-provider'

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
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />  
      </body>
    </html>
  )
}
