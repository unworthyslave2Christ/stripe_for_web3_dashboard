import type {
    CustomerSubscriptionInterval,
} from "./customer-subscription.types";

export function CustomerSubscriptionAmount({
    amount,
    currency,
    interval,
}: {
    amount: string;
    currency: string;
    interval: CustomerSubscriptionInterval;
}) {
    return (
        <div>

            <p className="text-lg font-semibold tracking-tight">
                {currency} {amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                {formatInterval(interval)}
            </p>

        </div>
    );
}

function formatInterval(
    interval: CustomerSubscriptionInterval,
) {
    switch (interval) {
        case "DAY":
            return "per day";

        case "WEEK":
            return "per week";

        case "YEAR":
            return "per year";

        default:
            return "per month";
    }
}