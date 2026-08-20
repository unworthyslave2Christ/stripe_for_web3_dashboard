"use client";

import {
    useState,
} from "react";

import {
    Check,
    Copy,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function AddressBlock({
    icon: Icon,
    title,
    description,
    address,
}: {
    icon: typeof Copy;

    title: string;

    description: string;

    address:
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
                        {address ??
                            "Unavailable"}
                    </code>

                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={
                            copyAddress
                        }
                        disabled={
                            !address
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

                </div>

            </div>

        </div>
    );
}