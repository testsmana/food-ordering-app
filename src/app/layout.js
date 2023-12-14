import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import { AppProvider } from '@/components/AppContext';
import { Toaster } from 'react-hot-toast';
import "./globalss.scss";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Restaurant-Name',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="_0iwSREa4ppa1u5utFQtESGYIThi9QtQTHh162EbqzM" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={roboto.className}>
        {/* here you can change width of all page*/}
        <main className="max-w-5xl mx-auto p-4">
          <AppProvider>
          <Toaster/>
          <Header/>
          {children}
          <footer className="border-t p-8 text-center text-gray-500 mt-16">
          Copyright &copy; 2023 Mana Inc. All rights reserved.
          </footer>
          </AppProvider>
        </main>
        
      </body>
    </html>
  )
}
