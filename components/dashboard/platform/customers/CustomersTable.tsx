import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { CustomerTableRow } from "./CustomerTableRow";
import type { CustomerRecord } from "./customer.types";

const customers: CustomerRecord[] = [
    {
        id: "cust_001",
        name: "Acme Customer",
        customerId: "cus_8F2A91",
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        smartAccount: "0x1Cc103c9b156eE9c2C496f582075a3086eC2347",
        status: "ACTIVE",
        activeSubscriptions: 3,
        totalSubscriptions: 4,
        lifetimeRevenue: "$1,842.00",
        createdAt: "Jun 01, 2026",
        lastActivity: "2 min ago",
    },
    {
        id: "cust_002",
        name: "Web3 Studio",
        customerId: "cus_7D91A2",
        walletAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        smartAccount: "0x9d2B0A6E2c0F9fA1234567890AbCdEf1234567890",
        status: "ACTIVE",
        activeSubscriptions: 2,
        totalSubscriptions: 2,
        lifetimeRevenue: "$924.00",
        createdAt: "May 24, 2026",
        lastActivity: "14 min ago",
    },
    {
        id: "cust_003",
        name: "Nova Labs",
        customerId: "cus_5B21C8",
        walletAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        smartAccount: "0x7A1C8D2E4B5F67890123456789ABCDEF012345678",
        status: "ACTIVE",
        activeSubscriptions: 1,
        totalSubscriptions: 1,
        lifetimeRevenue: "$399.00",
        createdAt: "May 19, 2026",
        lastActivity: "1 hour ago",
    },
    {
        id: "cust_004",
        name: "Chain Finance",
        customerId: "cus_3A82F1",
        walletAddress: "0x52908400098527886E0F7030069857D2E4169EE7",
        smartAccount: "0x8F2A7C1D9E4B6A3F0123456789ABCDEF01234567",
        status: "SUSPENDED",
        activeSubscriptions: 0,
        totalSubscriptions: 2,
        lifetimeRevenue: "$1,124.00",
        createdAt: "Apr 28, 2026",
        lastActivity: "3 days ago",
    },
    {
        id: "cust_005",
        name: "Vertex Systems",
        customerId: "cus_1E73D4",
        walletAddress: "0xde709f2102306220921060314715629080e2fb77",
        smartAccount: "0x6A2B8D4F1C9E7034567890ABCDEF123456789012",
        status: "INACTIVE",
        activeSubscriptions: 0,
        totalSubscriptions: 1,
        lifetimeRevenue: "$215.00",
        createdAt: "Apr 11, 2026",
        lastActivity: "8 days ago",
    },
];

export function CustomersTable() {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px]">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Wallet
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Smart Account
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Subscriptions
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Lifetime revenue
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Last activity
                                </th>

                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map((customer) => (
                                <CustomerTableRow
                                    key={customer.id}
                                    customer={customer}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}