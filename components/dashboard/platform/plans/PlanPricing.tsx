import type { PlanRecord } from "@stripe-for-web3/core";

function formatInterval(
    interval: PlanRecord["billingPeriodNamed"],
) {
    switch (String(interval)) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "MONTH":
            return "month";

        case "YEAR":
            return "year";

        default:
            return String(interval).toLowerCase();
    }
}

interface PlanPricingProps {
    plan: PlanRecord;
}

export function PlanPricing({
    plan,
}: PlanPricingProps) {
    return (
        <div>
            <p className="font-medium">
                {plan.amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                / {formatInterval(
                    plan.billingPeriodNamed,
                )}

                {" · "}

                {plan.paymentToken}
            </p>
        </div>
    );
}