import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    PlanPaymentTokenCard,
} from "./PlanPaymentTokenCard";

import {
    PlanPricingCard,
} from "./PlanPricingCard";

export function PlanConfiguration({
    plan,
}: {
    plan: {
        description: string;
        merchantId: number;
        createdAt: string;
        amount: string;
        currency: string;
        billingInterval: string;
        paymentToken: string;
        paymentTokenAddress: string;
    };
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
                        label="Description"
                        value={plan.description}
                    />

                    <ConfigRow
                        label="Merchant ID"
                        value={String(plan.merchantId)}
                    />

                    <ConfigRow
                        label="Created"
                        value={plan.createdAt}
                    />

                </CardContent>

            </Card>

            <PlanPricingCard
                amount={plan.amount}
                currency={plan.currency}
                interval={plan.billingInterval}
            />

            <PlanPaymentTokenCard
                symbol={plan.paymentToken}
                address={plan.paymentTokenAddress}
            />

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

            <span className="max-w-[65%] text-right text-sm font-medium">
                {value}
            </span>

        </div>
    );
}