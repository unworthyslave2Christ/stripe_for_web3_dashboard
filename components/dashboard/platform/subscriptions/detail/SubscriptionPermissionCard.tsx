"use client";

import {
    CheckCircle2,
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
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

export function SubscriptionPermissionCard({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
}) {
    const configured =
        Boolean(
            subscription.permissionId,
        );

    return (
        <Card>

            <CardHeader>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                            <ShieldCheck className="size-4" />
                        </div>

                        <div>

                            <CardTitle>
                                Billing authorization
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                The Smart Account authorization associated with this subscription.
                            </p>

                        </div>

                    </div>

                    <Badge
                        variant={
                            configured
                                ? "secondary"
                                : "outline"
                        }
                    >
                        {configured && (
                            <CheckCircle2 />
                        )}

                        {configured
                            ? "Configured"
                            : "Not exposed"}
                    </Badge>

                </div>

            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                    <div className="rounded-lg border bg-muted/20 p-4">

                        <p className="flex items-center gap-2 text-xs text-muted-foreground">
                            <WalletCards className="size-3.5" />
                            Smart account
                        </p>

                        <p className="mt-2 break-all font-mono text-xs">
                            {subscription.smartAccount}
                        </p>

                    </div>

                    <div className="rounded-lg border bg-muted/20 p-4">

                        <p className="text-xs text-muted-foreground">
                            Permission ID
                        </p>

                        <p className="mt-2 break-all font-mono text-xs">
                            {subscription.permissionId ??
                                "Not exposed by the current subscription resource"}
                        </p>

                    </div>

                </div>

                <div className="mt-4">

                    <Button
                        variant="outline"
                        disabled
                    >
                        Manage permission
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}