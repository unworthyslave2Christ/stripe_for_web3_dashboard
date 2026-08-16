import { Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";

type CustomerWalletProps = {
    address: string;
};

function shortenAddress(address: string) {
    if (address.length < 12) {
        return address;
    }

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CustomerWallet({
    address,
}: CustomerWalletProps) {
    return (
        <div className="flex items-center gap-2">
            <Wallet className="size-4 text-muted-foreground" />

            <Button
                variant="ghost"
                className="h-auto p-0 font-mono text-xs font-normal hover:bg-transparent hover:underline"
            >
                {shortenAddress(address)}
            </Button>
        </div>
    );
}