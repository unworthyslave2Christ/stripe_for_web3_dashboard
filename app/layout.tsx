import {Providers} from "@/providers/privy-provider";

import type { Metadata } from "next";

import {
    Geist,
    Geist_Mono,
    Inter
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Stripe for Web3",
    description:
        "Stripe for Web3 merchant and customer platform"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.className} ${geistMono.className}`}
            >     
                   <Providers>
                    {children}
                   </Providers>
            </body>
        </html>
    );
}