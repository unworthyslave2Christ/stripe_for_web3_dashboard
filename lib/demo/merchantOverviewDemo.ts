export interface MerchantOverviewDemo {
    customers: number;

    customersPrevious:
        number;

    activeSubscriptions:
        number;

    activeSubscriptionsPrevious:
        number;

    monthlyRevenue:
        number;

    monthlyRevenuePrevious:
        number;

    billingSuccessRate:
        number;

    revenueSeries: Array<{
        label: string;
        value: number;
    }>;

    subscriptionSeries:
        number[];

    customerSeries:
        number[];

    activity: Array<{
        id: string;

        title: string;

        description: string;

        time: string;

        kind:
            | "success"
            | "info";
    }>;
}

export const merchantOverviewDemo:
    MerchantOverviewDemo = {
        customers:
            2431,

        customersPrevious:
            2163,

        activeSubscriptions:
            1892,

        activeSubscriptionsPrevious:
            1749,

        monthlyRevenue:
            45231,

        monthlyRevenuePrevious:
            39420,

        billingSuccessRate:
            99.4,

        revenueSeries: [
            {
                label: "Jan",
                value: 21800,
            },
            {
                label: "Feb",
                value: 26100,
            },
            {
                label: "Mar",
                value: 30200,
            },
            {
                label: "Apr",
                value: 34750,
            },
            {
                label: "May",
                value: 39420,
            },
            {
                label: "Jun",
                value: 45231,
            },
        ],

        subscriptionSeries: [
            1020,
            1110,
            1190,
            1280,
            1350,
            1420,
            1510,
            1610,
            1700,
            1780,
            1840,
            1892,
        ],

        customerSeries: [
            1520,
            1600,
            1690,
            1780,
            1880,
            1970,
            2050,
            2140,
            2210,
            2280,
            2360,
            2431,
        ],

        activity: [
            {
                id: "activity-1",
                title:
                    "New customer created",
                description:
                    "Customer Smart Account registered.",
                time:
                    "4 minutes ago",
                kind:
                    "success",
            },
            {
                id: "activity-2",
                title:
                    "Subscription activated",
                description:
                    "Pro subscription activated.",
                time:
                    "18 minutes ago",
                kind:
                    "success",
            },
            {
                id: "activity-3",
                title:
                    "Smart Account funded",
                description:
                    "A customer wallet received funds.",
                time:
                    "31 minutes ago",
                kind:
                    "info",
            },
        ],
    };