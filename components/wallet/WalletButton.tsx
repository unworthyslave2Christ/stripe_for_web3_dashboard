"use client";

import {
    usePrivy,
} from "@privy-io/react-auth";

import {
    Check,
    Loader2,
    LogOut,
    WalletCards,
} from "lucide-react";

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

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

function shortenAddress(
    address?: string,
): string {
    if (!address) {
        return "Not connected";
    }

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface WalletButtonProps {
    label?: string;

    compact?: boolean;
}

////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////

export function WalletButton({
    label = "Wallet",
    compact = false,
}: WalletButtonProps) {
    const {
        ready,
        authenticated,
        user,
        login,
        logout,
    } = usePrivy();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (!ready) {
        return (
            <div className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2">

                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>

                {!compact && (
                    <div className="hidden sm:block">
                        <p className="text-xs text-muted-foreground">
                            {label}
                        </p>

                        <p className="text-sm font-medium">
                            Connecting...
                        </p>
                    </div>
                )}

            </div>
        );
    }

    const address =
        user?.wallet?.address;

    ////////////////////////////////////////////////////////////
    // DISCONNECTED
    ////////////////////////////////////////////////////////////

    if (!authenticated) {
        return (
            <div className="flex items-center gap-2">

                {!compact && (
                    <div className="hidden text-right sm:block">

                        <p className="text-xs text-muted-foreground">
                            {label}
                        </p>

                        <p className="text-sm font-medium">
                            Not connected
                        </p>

                    </div>
                )}

                <Button
                    onClick={login}
                    variant="outline"
                >
                    <WalletCards />
                    Connect
                </Button>

            </div>
        );
    }

    ////////////////////////////////////////////////////////////
    // CONNECTED
    ////////////////////////////////////////////////////////////

    return (
        <div className="flex items-center gap-2">

            <div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 sm:flex">

                <Avatar className="size-7">

                    <AvatarFallback>
                        <WalletCards className="size-3.5" />
                    </AvatarFallback>

                </Avatar>

                <div>

                    <div className="flex items-center gap-2">

                        <p className="text-xs font-medium">
                            {label}
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
                        {shortenAddress(address)}
                    </p>

                </div>

            </div>

            <Button
                onClick={logout}
                variant="ghost"
                size={compact ? "icon" : "sm"}
                aria-label="Disconnect wallet"
            >
                {compact ? (
                    <LogOut />
                ) : (
                    <>
                        <LogOut />
                        Disconnect
                    </>
                )}
            </Button>

        </div>
    );
}