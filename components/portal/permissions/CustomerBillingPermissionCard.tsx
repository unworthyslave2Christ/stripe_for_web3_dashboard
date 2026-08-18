import Link from "next/link";

import {
    CheckCircle2,
    CreditCard,
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

export function CustomerBillingPermissionCard() {
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
                                The active permission that allows recurring billing for your subscriptions.
                            </p>

                        </div>

                    </div>

                    <Badge variant="secondary">
                        <CheckCircle2 />
                        Active
                    </Badge>

                </div>

            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                    <PermissionFact
                        icon={WalletCards}
                        label="Smart Account"
                        value="0xf1cc...2347"
                    />

                    <PermissionFact
                        icon={CreditCard}
                        label="Subscriptions"
                        value="2 active"
                    />

                    <PermissionFact
                        icon={ShieldCheck}
                        label="Authorization"
                        value="Active"
                    />

                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-sm font-medium">
                            This permission supports your active subscriptions.
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Revoking this authorization may prevent recurring
                            subscription billing from completing.
                        </p>

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

            <p className="mt-1 text-sm font-medium">
                {value}
            </p>

        </div>
    );
}