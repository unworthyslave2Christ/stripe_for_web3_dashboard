"use client";

import {
    useState,
} from "react";

import {
    Check,
    Copy,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerBillingInformation({
    smartAccount,
    billingAuthorizationActive,
    demo,
}: {
    smartAccount:
        | string
        | undefined;

    billingAuthorizationActive:
        boolean;

    demo:
        boolean;
}) {
    const [
        copied,
        setCopied,
    ] = useState(false);

    async function copyAddress() {

        if (!smartAccount) {
            return;
        }

        await navigator.clipboard.writeText(
            smartAccount,
        );

        setCopied(true);

        window.setTimeout(
            () => {
                setCopied(false);
            },
            1500,
        );
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
                        {smartAccount ??
                            "Smart Account unavailable"}
                    </p>

                    {smartAccount && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={
                                copyAddress
                            }
                        >
                            {copied ? (
                                <>
                                    <Check />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy />
                                    Copy address
                                </>
                            )}
                        </Button>
                    )}

                </div>

                <div className="flex gap-3 rounded-lg border bg-muted/20 p-4">

                    <ShieldCheck
                        className={
                            billingAuthorizationActive
                                ? "mt-0.5 size-4 text-emerald-600 dark:text-emerald-400"
                                : "mt-0.5 size-4 text-muted-foreground"
                        }
                    />

                    <div>

                        <p className="text-sm font-medium">
                            {billingAuthorizationActive
                                ? "Billing authorization active"
                                : "Billing authorization status unavailable"}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {demo
                                ? "Authorization state is currently represented using test-mode data."
                                : "Authorization details will appear here when the permission resource is connected."}
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}