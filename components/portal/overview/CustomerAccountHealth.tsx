import {
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerAccountHealth() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Account health
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <HealthRow
                    title="Smart Account"
                    description="Available and operational"
                />

                <HealthRow
                    title="Billing permission"
                    description="Authorized for active subscriptions"
                />

                <HealthRow
                    title="Subscription status"
                    description="All active subscriptions are healthy"
                />

                <div className="rounded-lg border bg-muted/30 p-4">

                    <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-2">

                            <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />

                            <span className="text-sm font-medium">
                                Everything looks good
                            </span>

                        </div>

                        <Badge variant="secondary">
                            Healthy
                        </Badge>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}

function HealthRow({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-3">

            <CheckCircle2 className="mt-0.5 size-4 text-emerald-600 dark:text-emerald-400" />

            <div>

                <p className="text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}