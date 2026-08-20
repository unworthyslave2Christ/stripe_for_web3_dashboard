import {
    ShieldCheck,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import type {
    Address,
} from "viem";

function shortenAddress(
    address: Address,
) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CustomerSmartAccount({
    address,
}: {
    address: Address;
}) {
    return (
        <div className="flex min-w-0 items-center gap-2">

            <ShieldCheck className="size-4 text-muted-foreground" />

            <span className="truncate font-mono text-xs">
                {shortenAddress(address)}
            </span>

            <Badge
                variant="secondary"
                className="shrink-0"
            >
                Smart Account
            </Badge>

        </div>
    );
}