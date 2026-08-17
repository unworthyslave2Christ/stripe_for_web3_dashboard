"use client";

import {
    Copy,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerBillingInformation() {
    const [
        copied,
        setCopied,
    ] = useState(false);

    const smartAccount =
        "0xf1cc103c9b156eE9c2C496f582075a3086eC2347";

    async function copyAddress() {
        await navigator.clipboard.writeText(
            smartAccount,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Billing information
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <div className="rounded-lg border bg-muted/20 p-4">

                    <div className="flex items-center gap-2">

                        <WalletCards className="size-4 text-muted-foreground" />

                        <p className="text-sm font-medium">
                            Billing Smart Account
                        </p>

                    </div>

                    <p className="mt-2 break-all font-mono text-xs leading-6 text-muted-foreground">
                        {smartAccount}
                    </p>

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

                <div className="flex gap-3 rounded-lg border bg-muted/20 p-4">

                    <ShieldCheck className="mt-0.5 size-4 text-emerald-600 dark:text-emerald-400" />

                    <div>

                        <p className="text-sm font-medium">
                            Billing authorization active
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Your active subscriptions are authorized through
                            the permission associated with your Smart Account.
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}