
"use client";

import { useWalletClient, usePublicClient } from "wagmi";

export function useWalletClients(){
    const { data: walletClient } = useWalletClient();
    
    const publicClient = usePublicClient();

    return {
        walletClient,

        publicClient
    }
    
}