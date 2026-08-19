export const smartAccountDemo = {
    createdAt:
        "June 04, 2025",

    activePermissions:
        1,

    billingAuthorization:
        "ACTIVE" as const,

    supportedAssets:
        [
            "USDC",
        ],

    activity: [
        {
            title:
                "Billing authorization verified",

            description:
                "The active subscription permission was verified.",

            time:
                "2 hours ago",

            status:
                "success" as const,
        },

        {
            title:
                "Billing completed",

            description:
                "A recurring subscription charge completed successfully.",

            time:
                "2 hours ago",

            status:
                "success" as const,
        },

        {
            title:
                "Smart Account created",

            description:
                "Your Stripe for Web3 Smart Account was created.",

            time:
                "12 days ago",

            status:
                "success" as const,
        },
    ],
};