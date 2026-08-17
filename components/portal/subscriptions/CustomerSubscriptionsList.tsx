import {
    CustomerSubscriptionListItem,
} from "./CustomerSubscriptionListItem";

import type {
    CustomerSubscriptionRecord,
} from "./customer-subscription.types";

const subscriptions: CustomerSubscriptionRecord[] = [
    {
        id: "sub_pro_001",
        subscriptionId: 10021,
        planId: 90,
        planName: "Pro",
        planDescription:
            "For growing teams that need more.",
        amount: "19",
        currency: "USD",
        interval: "MONTH",
        status: "ACTIVE",
        nextBilling: "Jun 12, 2025",
        createdAt: "May 12, 2025",
        totalBilled: "$76",
        billingPermissionActive: true,
    },
    {
        id: "sub_analytics_001",
        subscriptionId: 10031,
        planId: 92,
        planName: "Analytics",
        planDescription:
            "Advanced analytics capabilities.",
        amount: "9",
        currency: "USD",
        interval: "MONTH",
        status: "ACTIVE",
        nextBilling: "Jun 20, 2025",
        createdAt: "May 20, 2025",
        totalBilled: "$18",
        billingPermissionActive: true,
    },
    {
        id: "sub_team_004",
        subscriptionId: 10041,
        planId: 93,
        planName: "Team",
        planDescription:
            "Collaborative workflow automation.",
        amount: "29",
        currency: "USD",
        interval: "MONTH",
        status: "PAUSED",
        nextBilling: null,
        createdAt: "March 02, 2025",
        totalBilled: "$58",
        billingPermissionActive: false,
    },
];

export function CustomerSubscriptionsList() {
    return (
        <div className="space-y-3">

            {subscriptions.map(
                (subscription) => (
                    <CustomerSubscriptionListItem
                        key={
                            subscription.id
                        }
                        subscription={
                            subscription
                        }
                    />
                ),
            )}

        </div>
    );
}