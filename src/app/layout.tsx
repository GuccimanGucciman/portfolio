import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import AbstractBackground from '@/components/canvas/AbstractBackground'
import CustomCursor from '@/components/ui/CustomCursor'
import PlayfulScroll from '@/components/ui/PlayfulScroll'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

// Use Inter with better typographic options
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  // Use more optical sizes for better legibility
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: 'Gustav Brochmann | Web Developer & Designer',
  description: 'Professional portfolio of Gustav Brochmann, showcasing web development and design projects built with modern technologies.',
  keywords: ['web developer', 'portfolio', 'Next.js', 'React', 'frontend', 'design', 'Gustav Brochmann'],
  authors: [{ name: 'Gustav Brochmann' }],
  openGraph: {
    title: 'Gustav Brochmann | Web Developer & Designer',
    description: 'Personal portfolio showcasing modern web development projects and skills',
    url: 'https://gustavbrochmann.vercel.app',
    siteName: 'Gustav Brochmann Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gustav Brochmann | Web Developer',
    description: 'Personal portfolio showcasing modern web development projects and skills',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#01010A] text-white min-h-screen`}>
        <div className="relative min-h-screen">
          {/* Abstract minimalist background */}
          <AbstractBackground />
          
          {/* Custom cursor */}
          <CustomCursor />
          
          {/* Minimal scroll indicator */}
          <PlayfulScroll />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main content */}
          <main className="relative z-10 overflow-x-hidden">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  )
}
