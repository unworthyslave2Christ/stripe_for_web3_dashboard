import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    BillingTableRow,
} from "./BillingTableRow";

import type {
    BillingRecord,
} from "./billing.types";

const billingRecords: BillingRecord[] = [
    {
        id: "bill_001",
        billingId: "billing_8F42A1",
        customerId: "cus_8F42A91",
        customerName: "Alex Johnson",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 12, 2025 · 09:41",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x8f91...a21d",
    },
    {
        id: "bill_002",
        billingId: "billing_7D28B4",
        customerId: "cus_4B21C8",
        customerName: "Chain Finance",
        subscriptionId: 10022,
        planName: "Enterprise",
        amount: "99",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 12, 2025 · 08:23",
        smartAccount:
            "0x9d2B0A6E2c0F9fA1234567890AbCdEf1234567890",
        transactionHash:
            "0x2c51...f8ad",
    },
    {
        id: "bill_003",
        billingId: "billing_1F33C9",
        customerId: "cus_2D71F3",
        customerName: "Jane Smith",
        subscriptionId: 10023,
        planName: "Starter",
        amount: "0",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 11, 2025 · 16:42",
        smartAccount:
            "0x73C8...2B10",
        transactionHash:
            "0x7d18...2f6b",
    },
    {
        id: "bill_004",
        billingId: "billing_92AA71",
        customerId: "cus_1E73D4",
        customerName: "Vertex Systems",
        subscriptionId: 10024,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "FAILED",
        interval: "MONTH",
        processedAt: "Jun 11, 2025 · 13:08",
        smartAccount:
            "0x6A2B...9012",
        transactionHash: null,
    },
    {
        id: "bill_005",
        billingId: "billing_A17D33",
        customerId: "cus_3A82F1",
        customerName: "Nova Labs",
        subscriptionId: 10025,
        planName: "Enterprise",
        amount: "99",
        currency: "USD",
        status: "REFUNDED",
        interval: "MONTH",
        processedAt: "Jun 10, 2025 · 11:14",
        smartAccount:
            "0x7A1C...5678",
        transactionHash:
            "0x122a...98f3",
    },
];

export function BillingTable() {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Billing event
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Subscription
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Processed
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>

                            {billingRecords.map(
                                (billing) => (
                                    <BillingTableRow
                                        key={
                                            billing.id
                                        }
                                        billing={
                                            billing
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