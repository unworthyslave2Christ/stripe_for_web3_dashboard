"use client";

import Link from "next/link";

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

export function SmartAccountActions({
    address,
    explorerUrl,
}: {
    address:
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
        <div className="flex flex-wrap gap-2">

            <Button
                variant="outline"
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
                            View explorer
                        </a>
                    }
                    variant="outline"
                />
            )}

            <Button
                render={
                    <Link href="/portal/permissions">
                        <WalletCards />
                        Manage account
                    </Link>
                }
            />

        </div>
    );
}