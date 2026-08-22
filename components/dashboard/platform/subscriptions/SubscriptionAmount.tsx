import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

function formatInterval(
    interval: MerchantSubscriptionRecord["interval"],
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

export function SubscriptionAmount({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
}) {
    return (
        <div>
            <p className="font-medium">
                {subscription.currency}{" "}
                {subscription.amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                / {formatInterval(subscription.interval)}
            </p>
        </div>
    );
}