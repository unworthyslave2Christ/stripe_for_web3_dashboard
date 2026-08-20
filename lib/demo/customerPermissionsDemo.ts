import type {
    CustomerPermissionRecord,
} from "@/types/customer-permission";

export const customerPermissionsDemo:
    CustomerPermissionRecord[] = [
        {
            id:
                "permission_001",

            permissionId:
                "perm_billing_8F42A1",

            name:
                "Subscription billing",

            description:
                "Allows recurring billing operations for active subscriptions associated with this Smart Account.",

            status:
                "ACTIVE",

            scope: [
                "SUBSCRIPTION_BILLING",
            ],

            createdAt:
                "Jun 01, 2025",

            updatedAt:
                "Jun 01, 2025",

            subscriptionIds: [
                10021,
                10031,
            ],

            subscriptionNames: [
                "Pro",
                "Analytics",
            ],

            smartAccount:
                "",
        },
    ];