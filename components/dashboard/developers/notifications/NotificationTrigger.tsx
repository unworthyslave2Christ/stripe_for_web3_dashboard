import type {
    NotificationTrigger as NotificationTriggerType,
} from "./notification.types";

const labels: Record<
    NotificationTriggerType,
    string
> = {
    BILLING_SUCCEEDED:
        "Billing succeeds",

    BILLING_FAILED:
        "Billing fails",

    SUBSCRIPTION_CREATED:
        "Subscription created",

    SUBSCRIPTION_PAUSED:
        "Subscription paused",

    SUBSCRIPTION_CANCELLED:
        "Subscription cancelled",

    SUBSCRIPTION_RENEWAL:
        "Subscription renewal",

    PLAN_ARCHIVED:
        "Plan archived",

    SMART_ACCOUNT_EVENT:
        "Smart Account event",
};

export function NotificationTrigger({
    trigger,
}: {
    trigger: NotificationTriggerType;
}) {
    return (
        <div className="max-w-[220px]">
            <p className="text-sm font-medium">
                {labels[trigger]}
            </p>

            <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
                {trigger}
            </p>
        </div>
    );
}