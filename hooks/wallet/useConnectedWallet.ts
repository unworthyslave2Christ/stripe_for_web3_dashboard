"use client";

import {
    usePrivy,
} from "@privy-io/react-auth";

////////////////////////////////////////////////////////////
// RESULT
////////////////////////////////////////////////////////////

export interface ConnectedWalletState {
    ready: boolean;

    authenticated: boolean;

    address:
        | string
        | undefined;
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useConnectedWallet(): ConnectedWalletState {
    const {
        ready,
        authenticated,
        user,
    } = usePrivy();

    return {
        ready,

        authenticated,

        address:
            user?.wallet?.address,
    };
}