import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
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

export function BillingReconciliation({
    available,
}: {
    available: boolean;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Billing reconciliation
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <ReconciliationItem
                        icon={CheckCircle2}
                        title="On-chain settlements"
                        value={available ? "—" : "—"}
                        status={
                            available
                                ? "Healthy"
                                : "Unavailable"
                        }
                    />

                    <ReconciliationItem
                        icon={Clock3}
                        title="Pending reconciliation"
                        value="—"
                        status="Unavailable"
                    />

                    <ReconciliationItem
                        icon={AlertTriangle}
                        title="Exceptions"
                        value="—"
                        status="Unavailable"
                    />

                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-sm font-medium">
                            Reconciliation service
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Reconciliation operations are not yet
                            exposed through the merchant SDK.
                        </p>

                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled
                    >
                        Review reconciliation
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}

function ReconciliationItem({
    icon: Icon,
    title,
    value,
    status,
}: {
    icon: typeof CheckCircle2;
    title: string;
    value: string;
    status: string;
}) {
    return (
        <div className="rounded-lg border p-4">

            <div className="flex items-center justify-between">

                <Icon className="size-4 text-muted-foreground" />

                <Badge variant="outline">
                    {status}
                </Badge>

            </div>

            <p className="mt-4 text-sm text-muted-foreground">
                {title}
            </p>

            <p className="mt-1 text-2xl font-semibold">
                {value}
            </p>

        </div>
    );
}