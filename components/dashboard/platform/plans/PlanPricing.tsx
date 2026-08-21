import type {
    PlanRecord,
} from "@stripe-for-web3/core";

function formatInterval(
    interval: PlanRecord["billingPeriodNamed"],
) {
    switch (interval as string) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "YEAR":
            return "year";

        case "MONTH":
            return "month";

        default:
            return String(interval).toLowerCase();
    }
}

export function PlanPricing({
    plan,
}: {
    plan: PlanRecord;
}) {
    return (
        <div>
            <p className="font-medium">
                {/* {plan.currency} {plan.amount} */}
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