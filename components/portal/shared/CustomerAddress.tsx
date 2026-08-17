"use client";

import {
    Copy,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerAddress({
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
        <div className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1">

            <code className="font-mono text-[11px] text-muted-foreground">
                {address.slice(0, 8)}...
                {address.slice(-6)}
            </code>

            <Button
                variant="ghost"
                size="icon"
                className="size-6"
                onClick={copyAddress}
                aria-label="Copy Smart Account address"
            >
                <Copy className="size-3" />
            </Button>

        </div>
    );
}