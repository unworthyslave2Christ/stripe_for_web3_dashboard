////////////////////////////////////////////////////////////
// QUERY KEYS
////////////////////////////////////////////////////////////

export const queryKeys = {
    customer: {
        all:
            ["customer"] as const,

        byWallet: (
            wallet: string,
        ) =>
            [
                "customer",
                "wallet",
                wallet,
            ] as const,

        byId: (
            customerId: number | string,
        ) =>
            [
                "customer",
                "id",
                customerId,
            ] as const,

        subscriptions: (
            customerId: number | string,
        ) =>
            [
                "customer",
                "subscriptions",
                customerId,
            ] as const,

        subscription: (
            subscriptionId: number,
        ) =>
            [
                "customer",
                "subscription",
                subscriptionId,
            ] as const,

        plan: (
            planId: number,
        ) =>
            [
                "customer",
                "plan",
                planId,
            ] as const,
    },

    merchant: {
        all:
            ["merchant"] as const,

        byId: (
            merchantId: number,
        ) =>
            [
                "merchant",
                merchantId,
            ] as const,

        plans: (
            merchantId: number,
        ) =>
            [
                "merchant",
                "plans",
                merchantId,
            ] as const,
    },
};