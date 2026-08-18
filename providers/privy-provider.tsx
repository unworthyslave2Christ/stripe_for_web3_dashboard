'use client';

import {
    PrivyProvider,
} from "@privy-io/react-auth";

import {
    WagmiProvider,
} from "@privy-io/wagmi";

// import {
//     QueryClientProvider,
// } from "@tanstack/react-query";

import {QueryProvider} from "./QueryProvider";


import {
    ThemeProvider,
} from "@/components/theme/ThemeProvider";


import { privyConfig } from "@/lib/privy";
import { wagmiConfig } from "@/lib/wagmi";
import { queryClient } from "@/lib/queryClient";


export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        
        config={privyConfig}
    >

        <QueryProvider>

            <WagmiProvider
                config={wagmiConfig}
            >

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                   
                    {children}
                    
                </ThemeProvider>

            </WagmiProvider>

        </QueryProvider>

    </PrivyProvider>
  );
}
