import {
    CheckCircle2,
    CircleDollarSign,
    XCircle,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Card,
} from "@/components/ui/card";

export function SubscriptionBillingSummary({
    subscription,
}: {
    subscription: {
        totalBilled: string;
        successfulPayments: number;
        failedPayments: number;
    };
}) {
    return (
        <Grid className="grid-cols-1 gap-4 md:grid-cols-3">

            <BillingCard
                icon={CircleDollarSign}
                title="Total billed"
                value={subscription.totalBilled}
            />

            <BillingCard
                icon={CheckCircle2}
                title="Successful payments"
                value={String(
                    subscription.successfulPayments,
                )}
            />

            <BillingCard
                icon={XCircle}
                title="Failed payments"
                value={String(
                    subscription.failedPayments,
                )}
            />

        </Grid>
    );
}

function BillingCard({
    icon: Icon,
    title,
    value,
}: {
    icon: typeof CircleDollarSign;
    title: string;
    value: string;
}) {
    return (
        <Card className="p-5">

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4" />
                {title}
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
                {value}
            </p>

        </Card>
    );
}