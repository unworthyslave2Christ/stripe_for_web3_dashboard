import {
    SubscriptionActions,
} from "./SubscriptionActions";

import {
    SubscriptionAmount,
} from "./SubscriptionAmount";

import {
    SubscriptionCustomer,
} from "./SubscriptionCustomer";

import {
    SubscriptionIdentity,
} from "./SubscriptionIdentity";

import {
    SubscriptionPlan,
} from "./SubscriptionPlan";

import {
    SubscriptionStatusBadge,
} from "./SubscriptionStatusBadge";

import type {
    SubscriptionRecord,
} from "./subscription.types";

export function SubscriptionTableRow({
    subscription,
}: {
    subscription: SubscriptionRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <SubscriptionIdentity
                    subscription={subscription}
                />
            </td>

            <td className="px-4 py-4">
                <SubscriptionCustomer
                    subscription={subscription}
                />
            </td>

            <td className="px-4 py-4">
                <SubscriptionPlan
                    subscription={subscription}
                />
            </td>

            <td className="px-4 py-4">
                <SubscriptionAmount
                    subscription={subscription}
                />
            </td>

            <td className="px-4 py-4">
                <SubscriptionStatusBadge
                    status={subscription.status}
                />
            </td>

            <td className="px-4 py-4">
                <span className="text-sm">
                    {subscription.nextBilling}
                </span>
            </td>

            <td className="px-4 py-4">
                <span className="text-sm font-medium">
                    {subscription.totalBilled}
                </span>
            </td>

            <td className="px-4 py-4 text-right">
                <SubscriptionActions
                    subscriptionId={
                        subscription.subscriptionId
                    }
                />
            </td>

        </tr>
    );
}