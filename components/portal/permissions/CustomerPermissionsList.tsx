import {
    CustomerPermissionListItem,
} from "./CustomerPermissionListItem";

import type {
    CustomerPermissionRecord,
} from "./customer-permission.types";

const permissions: CustomerPermissionRecord[] = [
    {
        id: "permission_001",
        permissionId: "perm_billing_8F42A1",
        name: "Subscription billing",
        description:
            "Allows recurring billing operations for active subscriptions associated with this Smart Account.",
        status: "ACTIVE",
        scope: [
            "SUBSCRIPTION_BILLING",
        ],
        createdAt: "Jun 01, 2025",
        updatedAt: "Jun 01, 2025",
        subscriptionIds: [
            10021,
            10031,
        ],
        subscriptionNames: [
            "Pro",
            "Analytics",
        ],
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
    },
];

export function CustomerPermissionsList() {
    return (
        <div className="space-y-3">

            {permissions.map(
                (permission) => (
                    <CustomerPermissionListItem
                        key={
                            permission.id
                        }
                        permission={
                            permission
                        }
                    />
                ),
            )}

        </div>
    );
}