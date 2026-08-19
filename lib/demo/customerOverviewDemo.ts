export const customerOverviewDemo = {
    revenue: {
        monthlyUsd: 124.58,

        previousMonthlyUsd: 108.42,

        series: [
            {
                label: "Jan",
                value: 62.14,
            },
            {
                label: "Feb",
                value: 78.31,
            },
            {
                label: "Mar",
                value: 84.27,
            },
            {
                label: "Apr",
                value: 97.44,
            },
            {
                label: "May",
                value: 108.42,
            },
            {
                label: "Jun",
                value: 124.58,
            },
        ],
    },

    billing: {
        successRate: 99.2,
    },

    activity: [
        {
            id: "activity-1",
            title: "Billing authorization verified",
            description:
                "Your Smart Account is ready for recurring billing.",
            timestamp: "2 hours ago",
            status: "success" as const,
        },

        {
            id: "activity-2",
            title: "Subscription payment succeeded",
            description:
                "Your Pro subscription was charged successfully.",
            timestamp: "Yesterday",
            status: "success" as const,
        },

        {
            id: "activity-3",
            title: "Subscription renewed",
            description:
                "Your Pro subscription renewed for another billing period.",
            timestamp: "3 days ago",
            status: "info" as const,
        },
    ],
};