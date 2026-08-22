import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Grid,
} from "@/components/layout/Grid";

export function PlanConfiguration({
    plan,
}: {
    plan: PlanRecord;
}) {
    return (
        <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Plan settings
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <ConfigRow
                        label="Plan ID"
                        value={String(plan.planId)}
                    />

                    <ConfigRow
                        label="Merchant ID"
                        value={String(plan.merchantId)}
                    />

                    {/* <ConfigRow
                        label="Description"
                        value={plan.description}
                    /> */}

                    <ConfigRow
                        label="Billing interval"
                        value={formatInterval(
                            plan.billingPeriodNamed!,
                        )}
                    />

                    <ConfigRow
                        label="Status"
                        value={plan.status}
                    />

                    <ConfigRow
                        label="Created"
                        value={formatDate(
                            plan.createdAt,
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Payment token
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-sm font-medium">
                        {plan.paymentToken}
                    </p>

                    <p className="mt-2 break-all rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-5">
                        {plan.paymentToken}
                    </p>
                </CardContent>
            </Card>
        </Grid>
    );
}

function ConfigRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="max-w-[65%] text-right text-sm font-medium break-words">
                {value}
            </span>
        </div>
    );
}

function formatInterval(
    interval: string,
) {
    switch (interval) {
        case "DAY":
            return "Every day";
        case "WEEK":
            return "Every week";
        case "YEAR":
            return "Every year";
        default:
            return "Every month";
    }
}

function formatDate(
    value:
        | Date
        | string
        | number,
) {
    const date =
        value instanceof Date
            ? value
            : new Date(value);

    return Number.isNaN(
        date.getTime(),
    )
        ? "—"
        : new Intl.DateTimeFormat(
            "en-US",
            {
                dateStyle: "medium",
                timeStyle: "short",
            },
        ).format(date);
}