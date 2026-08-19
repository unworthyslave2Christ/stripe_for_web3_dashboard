import type {
    CustomerSubscriptionView,
} from "@/types/customer-subscription";

import {
    CustomerSubscriptionListItem,
} from "./CustomerSubscriptionListItem";

export function CustomerSubscriptionsList({
    subscriptions,
    onPause,
    onResume,
    onCancel,
    loading,
}: {
    subscriptions:
        CustomerSubscriptionView[];

    onPause:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    onResume:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    onCancel:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    loading: boolean;
}) {
    if (
        subscriptions.length ===
        0
    ) {
        return (
            <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                <p className="text-sm font-medium">
                    No subscriptions found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or status filter.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-3">

            {subscriptions.map(
                (
                    subscription,
                ) => (
                    <CustomerSubscriptionListItem
                        key={
                            subscription.id
                        }
                        subscription={
                            subscription
                        }
                        onPause={
                            onPause
                        }
                        onResume={
                            onResume
                        }
                        onCancel={
                            onCancel
                        }
                        actionLoading={
                            loading
                        }
                    />
                ),
            )}

        </div>
    );
}