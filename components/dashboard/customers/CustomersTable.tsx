import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerTableRow,
} from "./CustomerTableRow";

////////////////////////////////////////////////////////////
// PLACEHOLDER DATA
////////////////////////////////////////////////////////////

const customers = [
    {
        id: "cus_001",
        name: "Acme User",
        email: "user@example.com",
        wallet: "0xd6A3...7C17",
        smartAccount: "0x91B4...E842",
        smartAccountReady: true,
        status: "ACTIVE",
        subscriptions: 2,
        lastActivity: "2 minutes ago",
    },
    {
        id: "cus_002",
        name: "Jane Smith",
        email: "jane@example.com",
        wallet: "0x42F1...91AC",
        smartAccount: "0x73C8...2B10",
        smartAccountReady: true,
        status: "ACTIVE",
        subscriptions: 1,
        lastActivity: "18 minutes ago",
    },
    {
        id: "cus_003",
        name: "David Wilson",
        email: "david@example.com",
        wallet: "0xA812...C421",
        smartAccount: null,
        smartAccountReady: false,
        status: "PENDING",
        subscriptions: 0,
        lastActivity: "1 hour ago",
    },
    {
        id: "cus_004",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        wallet: "0x91A7...B812",
        smartAccount: "0xA812...9F31",
        smartAccountReady: true,
        status: "ACTIVE",
        subscriptions: 3,
        lastActivity: "3 hours ago",
    },
];

////////////////////////////////////////////////////////////
// TABLE
////////////////////////////////////////////////////////////

export function CustomersTable() {
    return (
        <Card>

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                                    Customer
                                </th>

                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                                    Wallet
                                </th>

                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                                    Smart account
                                </th>

                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                                    Subscriptions
                                </th>

                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                                    Last activity
                                </th>

                                <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {customers.map(
                                (customer) => (
                                    <CustomerTableRow
                                        key={customer.id}
                                        customer={customer}
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