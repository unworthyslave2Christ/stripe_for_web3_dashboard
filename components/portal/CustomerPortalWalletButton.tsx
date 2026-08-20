"use client";

import {
    Check,
    LogOut,
    WalletCards,
} from "lucide-react";

import {
    usePrivy,
} from "@privy-io/react-auth";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

function shortenAddress(
    address?: string,
) {
    if (!address) {
        return "Not connected";
    }

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CustomerPortalWalletButton() {
    const {
        ready,
        authenticated,
        user,
        login,
        logout,
    } = usePrivy();

    if (!ready) {
        return (
            <Button
                variant="outline"
                size="sm"
                disabled
            >
                <WalletCards />
                Connecting...
            </Button>
        );
    }

    if (!authenticated) {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={login}
            >
                <WalletCards />
                Connect wallet
            </Button>
        );
    }

    const address =
        user?.wallet?.address;

    return (
        <div className="flex items-center gap-2">

            <div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-1.5 sm:flex">

                <Avatar className="size-7">

                    <AvatarFallback>
                        <WalletCards className="size-3.5" />
                    </AvatarFallback>

                </Avatar>

                <div>

                    <div className="flex items-center gap-2">

                        <p className="text-xs font-medium">
                            Wallet
                        </p>

                        <Badge
                            variant="secondary"
                            className="h-5 px-1.5 text-[10px]"
                        >
                            <Check />
                            Connected
                        </Badge>

                    </div>

                    <p className="font-mono text-[11px] text-muted-foreground">
                        {shortenAddress(
                            address,
                        )}
                    </p>

                </div>

            </div>

            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={logout}
                aria-label="Disconnect wallet"
            >
                <LogOut />
            </Button>

        </div>
    );
}