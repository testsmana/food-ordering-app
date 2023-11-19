import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import { AppProvider } from '@/components/AppContext';


const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        {/* here you can change width of all page*/}
        <main className="max-w-5xl mx-auto p-4">
          <AppProvider>
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
