import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

import { SubscriptionIdentity } from "./SubscriptionIdentity";
import { SubscriptionCustomer } from "./SubscriptionCustomer";
import { SubscriptionPlan } from "./SubscriptionPlan";
import { SubscriptionAmount } from "./SubscriptionAmount";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { SubscriptionActions } from "./SubscriptionActions";

export function SubscriptionTableRow({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
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

            <td className="px-4 py-4 text-sm">
                {subscription.nextBilling ?? "—"}
            </td>

            <td className="px-4 py-4 text-sm font-medium">
                {subscription.totalBilled}
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