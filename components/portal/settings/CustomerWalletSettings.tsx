import Link from "next/link";

import {
    ExternalLink,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    AddressBlock,
} from "./AddressBlock";

export function CustomerWalletSettings({
    ownerWallet,
    smartAccount,
    network,
}: {
    ownerWallet:
        | string
        | undefined;

    smartAccount:
        | string
        | undefined;

    network:
        | string
        | undefined;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Wallet & Smart Account
                </CardTitle>

                <CardDescription>
                    Review the wallet that owns your Smart Account
                    and the account used by your subscriptions.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-5">

                <AddressBlock
                    icon={
                        WalletCards
                    }
                    title="Owner wallet"
                    description="The connected wallet that controls your Smart Account."
                    address={
                        ownerWallet
                    }
                />

                <AddressBlock
                    icon={
                        ShieldCheck
                    }
                    title="Smart Account"
                    description="The account used by your Stripe for Web3 subscriptions and billing permissions."
                    address={
                        smartAccount
                    }
                />

                <div className="flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-sm font-medium">
                            Network
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Your Smart Account is currently configured on{" "}
                            {network ??
                                "an unavailable network"}.
                        </p>

                    </div>

                    <Badge variant="outline">
                        {network ??
                            "Unavailable"}
                    </Badge>

                </div>

                <div className="flex flex-wrap gap-2">

                    <Button
                        render={
                            <Link href="/portal/smart-account">
                                Manage Smart Account
                            </Link>
                        }
                        variant="outline"
                    />

                    {smartAccount && (
                        <Button
                            render={
                                <a
                                    href={
                                        getExplorerUrl(
                                            smartAccount,
                                            network,
                                        )
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ExternalLink />
                                    Explorer
                                </a>
                            }
                            variant="outline"
                        />
                    )}

                </div>

            </CardContent>

        </Card>
    );
}

function getExplorerUrl(
    address: string,
    network:
        | string
        | undefined,
) {
    if (
        network ===
        "Arbitrum Sepolia"
    ) {
        return `https://sepolia.arbiscan.io/address/${address}`;
    }

    if (
        network ===
        "Arbitrum One"
    ) {
        return `https://arbiscan.io/address/${address}`;
    }

    return `#`;
}