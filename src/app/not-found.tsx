import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Fludo Web Design',
  description: 'Sorry, the page you are looking for does not exist. Return to our homepage for professional web design services.',
  robots: {
    index: false,
    follow: true
  }
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[rgb(var(--text-primary))]">
        Page Not Found
      </h2>
      <p className="text-lg text-[rgb(var(--text-secondary))] max-w-md mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="btn-primary px-6 py-3 text-lg"
      >
        Return to Homepage
      </Link>
    </div>
  )
}
