"use client";

import {
    Copy,
    ExternalLink,
    WalletCards,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function SmartAccountActions({
    address,
}: {
    address: string;
}) {
    async function copyAddress() {
        await navigator.clipboard.writeText(
            address,
        );
    }

    return (
        <div className="flex flex-wrap gap-2">

            <Button
                variant="outline"
                onClick={copyAddress}
            >
                <Copy />
                Copy address
            </Button>

            <Button variant="outline">
                <ExternalLink />
                View explorer
            </Button>

            <Button>
                <WalletCards />
                Manage account
            </Button>

        </div>
    );
}