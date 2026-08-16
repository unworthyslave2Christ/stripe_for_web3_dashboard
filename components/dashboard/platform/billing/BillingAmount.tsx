import type {
    BillingRecord,
} from "./billing.types";

export function BillingAmount({
    billing,
}: {
    billing: BillingRecord;
}) {
    return (
        <div>

            <p className="font-medium">
                {billing.currency} {billing.amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                {formatInterval(
                    billing.interval,
                )}
            </p>

        </div>
    );
}

function formatInterval(
    interval: BillingRecord["interval"],
) {
    switch (interval) {
        case "DAY":
            return "daily";

        case "WEEK":
            return "weekly";

        case "YEAR":
            return "yearly";

        default:
            return "monthly";
    }
}