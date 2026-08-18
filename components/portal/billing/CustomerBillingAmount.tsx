import type {
    CustomerBillingInterval,
} from "./customer-billing.types";

export function CustomerBillingAmount({
    amount,
    currency,
    interval,
}: {
    amount: string;
    currency: string;
    interval: CustomerBillingInterval;
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
    interval: CustomerBillingInterval,
) {
    switch (interval) {
        case "DAY":
            return "Daily";

        case "WEEK":
            return "Weekly";

        case "YEAR":
            return "Yearly";

        default:
            return "Monthly";
    }
}