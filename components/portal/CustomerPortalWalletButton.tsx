"use client";

import {
    WalletCards,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerPortalWalletButton() {
    return (
        <Button
            variant="outline"
            size="sm"
        >
            <WalletCards />

            <span className="hidden sm:inline">
                0x742d...f44e
            </span>

            <span className="sm:hidden">
                Wallet
            </span>
        </Button>
    );
}