export const queryKeys = {
    customer: {
        all:
            ["customer"] as const,

        byWallet: (
            wallet: string,
        ) => [
            "customer",
            "wallet",
            wallet,
        ] as const,

        byId: (
            customerId: number | string,
        ) => [
            "customer",
            "id",
            customerId,
        ] as const,

        subscriptions: (
            customerId: number | string,
        ) => [
            "customer",
            "subscriptions",
            customerId,
        ] as const,

        subscription: (
            subscriptionId: number,
        ) => [
            "customer",
            "subscription",
            subscriptionId,
        ] as const,

        plan: (
            planId: number,
        ) => [
            "customer",
            "plan",
            planId,
        ] as const,
    },

    merchant: {
        all:
            ["merchant"] as const,

        byOwnerWallet: (
            wallet: string,
        ) => [
            "merchant",
            "owner-wallet",
            wallet,
        ] as const,

        byId: (
            merchantId: number | string,
        ) => [
            "merchant",
            "id",
            merchantId,
        ] as const,

        plans: (
            merchantId: number | string,
        ) => [
            "merchant",
            "plans",
            merchantId,
        ] as const,

        plan: (planId: number) =>
            [
                "merchant",
                "plan",
                planId,
            ] as const,

        customers: (
            merchantId: number | string,
            params: {
                page: number;
                pageSize: number;
                search: string;
                status: string;
            },
        ) => [
            "merchant",
            "customers",
            merchantId,
            params,
        ] as const,

        notifications: (
            merchantId: number,
        ) => [
            "merchant",
            merchantId,
            "notifications",
        ] as const,
    },
} as const;