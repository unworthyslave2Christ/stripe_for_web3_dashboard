"use client";

import {
    Check,
    Copy,
    ExternalLink,
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
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SmartAccountIdentityCard({
    address,
    network,
}: {
    address: string;
    network: string;
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
        <Card>

            <CardHeader>

                <div className="flex items-center gap-3">

                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                        <WalletCards className="size-4" />
                    </div>

                    <div>

                        <CardTitle>
                            Smart Account address
                        </CardTitle>

                        <CardDescription>
                            Your Account Abstraction account on {network}.
                        </CardDescription>

                    </div>

                </div>

            </CardHeader>

            <CardContent>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <code className="break-all font-mono text-xs leading-6">
                        {address}
                    </code>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                    <Button
                        variant="outline"
                        onClick={copyAddress}
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

                    <Button variant="outline">
                        <ExternalLink />
                        View on explorer
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}