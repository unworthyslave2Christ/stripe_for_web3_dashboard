import Link from "next/link";

import {
    ArrowLeft,
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
    account,
}: {
    account: {
        address: string;
        status: "ACTIVE" | "PENDING" | "SUSPENDED";
        network: string;
    };
}) {
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
                                    account.status
                                }
                            />

                            <SmartAccountNetworkBadge
                                network={
                                    account.network
                                }
                            />

                        </div>

                        <p className="mt-2 max-w-2xl break-all font-mono text-xs text-muted-foreground">
                            {account.address}
                        </p>

                    </div>

                </div>

                <Inline gap={2}>

                    <Button variant="outline">
                        Copy address
                    </Button>

                    <Button variant="outline">
                        <ExternalLink />
                        Explorer
                    </Button>

                </Inline>

            </div>

        </div>
    );
}