import {
    Badge,
} from "@/components/ui/badge";

import {
    ShieldCheck,
} from "lucide-react";

export function CustomerOverviewHeader({
    customerName,
    smartAccount,
    mode,
}: {
    customerName:
        | string
        | undefined;

    smartAccount:
        | string
        | undefined;

    mode:
        | "demo"
        | "live";
}) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

                <div className="flex flex-wrap items-center gap-2">

                    <p className="text-sm font-medium text-muted-foreground">
                        Customer portal
                    </p>

                    {mode === "demo" && (
                        <Badge variant="outline">
                            Test mode
                        </Badge>
                    )}

                </div>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Welcome back
                    {customerName
                        ? `, ${customerName}`
                        : ""}
                    .
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Manage your Smart Account, subscriptions, billing,
                    transactions, permissions, and account activity.
                </p>

            </div>

            <div className="rounded-xl border bg-card px-4 py-3">

                <div className="flex items-center gap-3">

                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">

                        <ShieldCheck className="size-4 text-primary" />

                    </div>

                    <div>

                        <p className="text-xs text-muted-foreground">
                            Smart Account
                        </p>

                        <p className="mt-1 font-mono text-xs">
                            {smartAccount
                                ? `${smartAccount.slice(0, 8)}...${smartAccount.slice(-6)}`
                                : "Not created"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}