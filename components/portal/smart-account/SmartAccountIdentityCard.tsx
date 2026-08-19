"use client";

import {
    useState,
} from "react";

import {
    Check,
    Copy,
    ExternalLink,
    WalletCards,
} from "lucide-react";

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
    explorerUrl,
}: {
    address:
        | string
        | undefined;

    network:
        | string
        | undefined;

    explorerUrl:
        | string
        | undefined;
}) {
    const [
        copied,
        setCopied,
    ] = useState(false);

    async function copyAddress() {

        if (!address) {
            return;
        }

        await navigator.clipboard.writeText(
            address,
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

                <div className="flex items-center gap-3">

                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">

                        <WalletCards className="size-4" />

                    </div>

                    <div>

                        <CardTitle>
                            Smart Account address
                        </CardTitle>

                        <CardDescription>
                            Your Account Abstraction account
                            {network
                                ? ` on ${network}`
                                : "."}
                        </CardDescription>

                    </div>

                </div>

            </CardHeader>

            <CardContent>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <code className="break-all font-mono text-xs leading-6">
                        {address ??
                            "Smart Account has not been created."}
                    </code>

                </div>

                {address && (
                    <div className="mt-4 flex flex-wrap gap-2">

                        <Button
                            variant="outline"
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

                        {explorerUrl && (
                            <Button
                                render={
                                    <a
                                        href={
                                            explorerUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <ExternalLink />
                                        View on explorer
                                    </a>
                                }
                                variant="outline"
                            />
                        )}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}