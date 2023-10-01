import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

const font = Montserrat({ subsets: ['latin'], adjustFontFallback: true })

export const metadata: Metadata = {
  title: 'Invetory - controle de estoque',
  description: 'Sistema para gerenciar o estoque de sua empresa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterProvider />
          <body className={font.className}>{children}</body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  )
}
