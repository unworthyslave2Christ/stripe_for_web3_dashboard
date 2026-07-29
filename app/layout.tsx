import type {Metadata} from 'next'
import {Inter, Geist } from 'next/font/google'
import {AppProvider} from '@/providers/app-provider'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Stripe for Web3',
}

export default function RootLayout(
  {children}: {children: React.ReactNode}
){
  return(
    <html
      lang='en' className={cn("font-sans", geist.variable)}
    >
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>

    </html>
  )
}