import {
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function BillingSuccessSummary({
    available,
}: {
    available: boolean;
}) {
    const value =
        available
            ? "—"
            : "—";

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Billing performance
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

                <PerformanceRow
                    icon={CheckCircle2}
                    label="Succeeded"
                    value={value}
                />

                <PerformanceRow
                    icon={Clock3}
                    label="Pending"
                    value={value}
                />

                <PerformanceRow
                    icon={XCircle}
                    label="Failed"
                    value={value}
                />

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="text-xs text-muted-foreground">
                        Successful billing volume
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {value}
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}

function PerformanceRow({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof CheckCircle2;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3">

            <Icon className="size-4 text-muted-foreground" />

            <span className="flex-1 text-sm">
                {label}
            </span>

            <span className="text-sm font-medium">
                {value}
            </span>

        </div>
    );
}