import type { Metadata } from "next";

import {
    Geist,
    Geist_Mono,
    Inter
} from "next/font/google";

import "./globals.css";

import {
    ThemeProvider,
} from "@/components/theme/ThemeProvider";

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
        "Stripe for Web3 merchant dashboard",
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}