import {
    CheckCircle2,
    KeyRound,
    ShieldCheck,
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

export function SmartAccountPermissionCard({
    permissionStatus,
}: {
    permissionStatus:
        | "ACTIVE"
        | "PAUSED"
        | "REVOKED";
}) {
    const active =
        permissionStatus === "ACTIVE";

    return (
        <Card>

            <CardHeader>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                            <KeyRound className="size-4" />
                        </div>

                        <div>

                            <CardTitle>
                                Billing authorization
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Authorization used by your active subscriptions.
                            </p>

                        </div>

                    </div>

                    {active ? (
                        <Badge variant="secondary">
                            <CheckCircle2 />
                            Active
                        </Badge>
                    ) : (
                        <Badge variant="destructive">
                            {permissionStatus}
                        </Badge>
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <div className="flex items-start gap-3">

                        <ShieldCheck className="mt-0.5 size-4 text-muted-foreground" />

                        <div>

                            <p className="text-sm font-medium">
                                Subscription billing authorization
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Stripe for Web3 can use this authorization
                                for the recurring billing operations associated
                                with your active subscriptions.
                            </p>

                        </div>

                    </div>

                </div>

                <Button
                    variant="outline"
                    className="mt-4"
                >
                    Manage permissions
                </Button>

            </CardContent>

        </Card>
    );
}