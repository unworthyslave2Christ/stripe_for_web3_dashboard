"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Copy,
    ExternalLink,
    WalletCards,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    SmartAccountNetworkBadge,
} from "./SmartAccountNetworkBadge";

import {
    SmartAccountStatusBadge,
} from "./SmartAccountStatusBadge";

export function SmartAccountHeader({
    address,
    status,
    network,
    explorerUrl,
}: {
    address:
        | string
        | undefined;

    status:
        | "ACTIVE"
        | "PENDING"
        | "SUSPENDED"
        | "NOT_CREATED";

    network:
        | string
        | undefined;

    explorerUrl:
        | string
        | undefined;
}) {

    async function copyAddress() {

        if (!address) {
            return;
        }

        await navigator.clipboard.writeText(
            address,
        );
    }

    return (
        <div className="space-y-5">

            <Button
                render={
                    <Link href="/portal">
                        <ArrowLeft />
                        Overview
                    </Link>
                }
                variant="ghost"
                size="sm"
                className="-ml-2"
            />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/40">

                        <WalletCards className="size-5 text-muted-foreground" />

                    </div>

                    <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Smart Account
                            </h1>

                            <SmartAccountStatusBadge
                                status={
                                    status
                                }
                            />

                            <SmartAccountNetworkBadge
                                network={
                                    network
                                }
                            />

                        </div>

                        <p className="mt-2 max-w-2xl break-all font-mono text-xs text-muted-foreground">
                            {address ??
                                "Smart Account has not been created."}
                        </p>

                    </div>

                </div>

                <Inline gap={2}>

                    {address && (
                        <Button
                            variant="outline"
                            onClick={
                                copyAddress
                            }
                        >
                            <Copy />
                            Copy address
                        </Button>
                    )}

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
                                    Explorer
                                </a>
                            }
                            variant="outline"
                        />
                    )}

                </Inline>

            </div>

        </div>
    );
}