import type {
    PlanRecord,
} from "./plan.types";

interface PlanPricingProps {
    plan: PlanRecord;
}

export function PlanPricing({
    plan,
}: PlanPricingProps) {
    return (
        <div>
            <p className="font-medium">
                {plan.currency} {plan.amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                / {formatInterval(plan.billingInterval)}
            </p>
        </div>
    );
}

function formatInterval(
    interval: PlanRecord["billingInterval"],
) {
    switch (interval) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "YEAR":
            return "year";

        case "MONTH":
        default:
            return "month";
    }
}