"use client";

import {
    Copy,
    ExternalLink,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    useState,
} from "react";

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
} from "@/components/ui/card";

export function CustomerWalletSettings({
    ownerWallet,
    smartAccount,
    network,
}: {
    ownerWallet: string;
    smartAccount: string;
    network: string;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Wallet & Smart Account
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Review the wallet that owns your Smart Account and the account used by your subscriptions.
                </p>

            </CardHeader>

            <CardContent className="space-y-5">

                <AddressBlock
                    icon={WalletCards}
                    title="Owner wallet"
                    description="The connected wallet that controls your Smart Account."
                    address={ownerWallet}
                />

                <AddressBlock
                    icon={ShieldCheck}
                    title="Smart Account"
                    description="The account used by your Stripe for Web3 subscriptions and billing permissions."
                    address={smartAccount}
                />

                <div className="flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-sm font-medium">
                            Network
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Your Smart Account is currently configured on {network}.
                        </p>

                    </div>

                    <Badge variant="outline">
                        {network}
                    </Badge>

                </div>

                <div className="flex flex-wrap gap-2">

                    <Button
                        variant="outline"
                        render={
                            <a href="/portal/smart-account">
                                Manage Smart Account
                            </a>
                        }
                    />

                    <Button
                        variant="outline"
                    >
                        <ExternalLink />
                        Explorer
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}

function AddressBlock({
    icon: Icon,
    title,
    description,
    address,
}: {
    icon: typeof WalletCards;
    title: string;
    description: string;
    address: string;
}) {
    const [
        copied,
        setCopied,
    ] = useState(false);

    async function copyAddress() {
        await navigator.clipboard.writeText(
            address,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <div className="rounded-lg border bg-muted/20 p-4">

            <div className="flex items-start gap-3">

                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">

                    <p className="text-sm font-medium">
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>

                    <code className="mt-3 block break-all font-mono text-xs leading-6 text-muted-foreground">
                        {address}
                    </code>

                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={copyAddress}
                    >
                        <Copy />

                        {copied
                            ? "Copied"
                            : "Copy address"}
                    </Button>

                </div>

            </div>

        </div>
    );
}