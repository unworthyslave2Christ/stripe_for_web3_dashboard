import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    SubscriptionTableRow,
} from "./SubscriptionTableRow";

import type {
    SubscriptionRecord,
} from "./subscription.types";

const subscriptions: SubscriptionRecord[] = [
    {
        id: "sub_pro_001",
        subscriptionId: 10021,
        customerId: "cus_8F42A91",
        customerName: "Alex Johnson",
        planId: 90,
        planName: "Pro",
        smartAccount: "0xf1cc...C2347",
        amount: "19",
        currency: "USD",
        interval: "MONTH",
        status: "ACTIVE",
        nextBilling: "Jun 12, 2025",
        createdAt: "May 12, 2025",
        totalBilled: "$76.00",
    },
    {
        id: "sub_enterprise_004",
        subscriptionId: 10022,
        customerId: "cus_4B21C8",
        customerName: "Chain Finance",
        planId: 91,
        planName: "Enterprise",
        smartAccount: "0x9d2B...7890",
        amount: "99",
        currency: "USD",
        interval: "MONTH",
        status: "ACTIVE",
        nextBilling: "Jun 15, 2025",
        createdAt: "Mar 15, 2025",
        totalBilled: "$297.00",
    },
    {
        id: "sub_starter_009",
        subscriptionId: 10023,
        customerId: "cus_2D71F3",
        customerName: "Jane Smith",
        planId: 89,
        planName: "Starter",
        smartAccount: "0x73C8...2B10",
        amount: "0",
        currency: "USD",
        interval: "MONTH",
        status: "ACTIVE",
        nextBilling: "Jun 18, 2025",
        createdAt: "Apr 18, 2025",
        totalBilled: "$0.00",
    },
    {
        id: "sub_pro_014",
        subscriptionId: 10024,
        customerId: "cus_1E73D4",
        customerName: "Vertex Systems",
        planId: 90,
        planName: "Pro",
        smartAccount: "0x6A2B...9012",
        amount: "19",
        currency: "USD",
        interval: "MONTH",
        status: "PAUSED",
        nextBilling: "—",
        createdAt: "Feb 05, 2025",
        totalBilled: "$95.00",
    },
    {
        id: "sub_enterprise_015",
        subscriptionId: 10025,
        customerId: "cus_3A82F1",
        customerName: "Nova Labs",
        planId: 91,
        planName: "Enterprise",
        smartAccount: "0x7A1C...5678",
        amount: "99",
        currency: "USD",
        interval: "MONTH",
        status: "CANCELLED",
        nextBilling: "—",
        createdAt: "Jan 05, 2025",
        totalBilled: "$396.00",
    },
];

export function SubscriptionsTable() {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1200px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Subscription
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Plan
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Next billing
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Total billed
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>

                            {subscriptions.map(
                                (subscription) => (
                                    <SubscriptionTableRow
                                        key={
                                            subscription.id
                                        }
                                        subscription={
                                            subscription
                                        }
                                    />
                                ),
                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}