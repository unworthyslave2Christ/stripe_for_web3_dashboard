"use client";

import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

export function useConnectedWallet() {
    const {
        ready: privyReady,
        authenticated,
    } = usePrivy();

    const {
        address,
        isConnected,
    } = useAccount();

    const walletConnected =
        Boolean(
            isConnected &&
            address,
        );

    return {
        ready: privyReady,

        authenticated,

        isConnected: walletConnected,

        address:
            walletConnected
                ? address
                : undefined,
    };
}