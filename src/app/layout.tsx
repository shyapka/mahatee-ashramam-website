import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mahatee Ashramam - Building Brighter Futures',
  description: 'Providing food, shelter, and education to orphaned and underprivileged children in Telangana, India.',
  keywords: 'nonprofit, charity, children, education, orphanage, Telangana, India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Hidden Netlify form for donation confirmations */}
        <form name="donation-confirmations" data-netlify="true" style={{display: 'none'}}>
          <input type="text" name="timestamp" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="amount" />
          <input type="text" name="currency" />
          <input type="text" name="payment_method" />
          <input type="text" name="location" />
          <input type="text" name="reference_id" />
          <textarea name="message"></textarea>
          <input type="text" name="status" />
        </form>
      </body>
    </html>
  )
}