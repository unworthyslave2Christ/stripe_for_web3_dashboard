"use client";

import {
    Copy,
    Wallet,
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

export function SmartAccountOwnerCard({
    ownerWallet,
}: {
    ownerWallet: string;
}) {
    const [
        copied,
        setCopied,
    ] = useState(false);

    async function copyWallet() {
        await navigator.clipboard.writeText(
            ownerWallet,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <Card>

            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wallet className="size-4" />
                    Owner wallet
                </CardTitle>
            </CardHeader>

            <CardContent>

                <p className="text-sm text-muted-foreground">
                    This wallet controls ownership of your Smart Account.
                </p>

                <div className="mt-4 rounded-lg border bg-muted/30 p-4">

                    <code className="break-all font-mono text-xs leading-6">
                        {ownerWallet}
                    </code>

                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={copyWallet}
                >
                    {copied ? "Copied" : "Copy owner address"}
                    <Copy />
                </Button>

            </CardContent>

        </Card>
    );
}