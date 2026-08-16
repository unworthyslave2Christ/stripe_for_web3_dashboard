import type {
    SubscriptionRecord,
} from "./subscription.types";

export function SubscriptionAmount({
    subscription,
}: {
    subscription: SubscriptionRecord;
}) {
    return (
        <div>
            <p className="font-medium">
                {subscription.currency} {subscription.amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                / {formatInterval(subscription.interval)}
            </p>
        </div>
    );
}

function formatInterval(
    interval: SubscriptionRecord["interval"],
) {
    switch (interval) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "YEAR":
            return "year";

        default:
            return "month";
    }
}