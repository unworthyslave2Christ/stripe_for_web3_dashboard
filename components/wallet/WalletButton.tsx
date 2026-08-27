"use client";

import { useAccount, useDisconnect } from "wagmi";
import {
    Check,
    Loader2,
    LogOut,
    WalletCards,
} from "lucide-react";
import {
    usePrivy,
    useConnectWallet,
} from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";

function shortenAddress(
        address?: string,
    ): string {
        if (!address) {
            return "Not connected";
        }

        if (address.length < 12) {
            return address;
        }

        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

export function WalletButton({
    label = "Wallet",
    compact = false,
}: {
    label?: string;
    compact?: boolean;
}) {
    const {
        ready: privyReady,
    } = usePrivy();

    const {
        address,
        isConnected,
        isConnecting,
        isReconnecting,
    } = useAccount();

    const {
        disconnect,
    } = useDisconnect();

    const {
        connectWallet,
    } = useConnectWallet({
        onError: (error) => {
            console.error(
                "Wallet connection failed:",
                error,
            );
        },
    });

    if (!privyReady) {
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
                            Initializing...
                        </p>
                    </div>
                )}
            </div>
        );
    }

    if (!isConnected || !address) {
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
                    onClick={() => {
                        connectWallet({
                            description:
                                "Connect your merchant wallet to continue onboarding.",
                            walletList: [
                                "metamask",
                            ],
                            walletChainType:
                                "ethereum-only",
                        });
                    }}
                    variant="outline"
                    disabled={
                        isConnecting ||
                        isReconnecting
                    }
                >
                    {isConnecting ||
                    isReconnecting ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <WalletCards />
                    )}

                    {isConnecting ||
                    isReconnecting
                        ? "Connecting..."
                        : "Connect"}
                </Button>
            </div>
        );
    }

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
                onClick={() => disconnect()}
                variant="ghost"
                size={
                    compact
                        ? "icon"
                        : "sm"
                }
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