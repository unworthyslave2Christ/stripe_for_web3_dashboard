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

export function CustomerTransactionInformation() {
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
                    Transaction information
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="rounded-lg border bg-muted/20 p-4">

                        <div className="flex items-center gap-2 text-sm font-medium">

                            <WalletCards className="size-4 text-muted-foreground" />

                            Smart Account

                        </div>

                        <code className="mt-3 block break-all font-mono text-xs leading-6 text-muted-foreground">
                            {smartAccount}
                        </code>

                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={
                                copyAddress
                            }
                        >
                            <Copy />

                            {copied
                                ? "Copied"
                                : "Copy address"}
                        </Button>

                    </div>

                    <div className="rounded-lg border bg-muted/20 p-4">

                        <div className="flex items-center gap-2 text-sm font-medium">

                            <ShieldCheck className="size-4 text-muted-foreground" />

                            Account authorization

                        </div>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Transactions associated with your subscriptions
                            are authorized through the Smart Account permissions
                            required by the billing flow.
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}