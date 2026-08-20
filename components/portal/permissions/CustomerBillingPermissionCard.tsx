import Link from "next/link";

import {
    CheckCircle2,
    CreditCard,
    KeyRound,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type {
    CustomerPermissionRecord,
} from "@/types/customer-permission";

export function CustomerBillingPermissionCard({
    permission,
    smartAccount,
    activeSubscriptions,
    demo,
}: {
    permission:
        | CustomerPermissionRecord
        | null;

    smartAccount:
        | string
        | undefined;

    activeSubscriptions:
        number;

    demo: boolean;
}) {
    const active =
        permission?.status ===
        "ACTIVE";

    return (
        <Card className="overflow-hidden border-primary/20">

            <CardHeader>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-start gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">

                            <ShieldCheck className="size-5 text-primary" />

                        </div>

                        <div>

                            <CardTitle>
                                Subscription billing authorization
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                The permission that allows recurring billing for your subscriptions.
                            </p>

                        </div>

                    </div>

                    {active ? (
                        <Badge variant="secondary">
                            <CheckCircle2 />
                            Active
                        </Badge>
                    ) : (
                        <Badge variant="outline">
                            {permission?.status ??
                                "Unavailable"}
                        </Badge>
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                    <PermissionFact
                        icon={
                            WalletCards
                        }
                        label="Smart Account"
                        value={
                            smartAccount
                                ? `${smartAccount.slice(0, 8)}...${smartAccount.slice(-6)}`
                                : "Unavailable"
                        }
                    />

                    <PermissionFact
                        icon={
                            CreditCard
                        }
                        label="Subscriptions"
                        value={
                            `${activeSubscriptions} active`
                        }
                    />

                    <PermissionFact
                        icon={
                            KeyRound
                        }
                        label="Authorization"
                        value={
                            permission?.status ??
                            "Unavailable"
                        }
                    />

                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-sm font-medium">
                            {active
                                ? "This permission supports your active subscriptions."
                                : "This billing authorization requires attention."}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">

                            {active
                                ? "Revoking or pausing this authorization may prevent future recurring subscription billing from completing."
                                : "Permission data is currently unavailable for direct management."}

                        </p>

                        {demo && (
                            <p className="mt-2 text-xs text-muted-foreground">
                                Authorization is currently represented using test-mode permission data.
                            </p>
                        )}

                    </div>

                    <Button
                        render={
                            <Link href="/portal/smart-account">
                                View Smart Account
                            </Link>
                        }
                        variant="outline"
                        size="sm"
                    />

                </div>

            </CardContent>

        </Card>
    );
}

function PermissionFact({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof ShieldCheck;

    label: string;

    value: string;
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-4">

            <Icon className="size-4 text-muted-foreground" />

            <p className="mt-3 text-xs text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 break-all text-sm font-medium">
                {value}
            </p>

        </div>
    );
}