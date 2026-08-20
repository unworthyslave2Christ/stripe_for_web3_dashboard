import {
    Wallet,
} from "lucide-react";

import type {
    Address,
} from "viem";

function shortenAddress(
    address: Address,
) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CustomerWallet({
    address,
}: {
    address: Address;
}) {
    return (
        <div className="flex items-center gap-2">

            <Wallet className="size-4 text-muted-foreground" />

            <span className="font-mono text-xs">
                {shortenAddress(address)}
            </span>

        </div>
    );
}