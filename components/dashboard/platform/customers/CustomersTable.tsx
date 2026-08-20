"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerTableRow,
} from "./CustomerTableRow";

import type {
    CustomerRecord,
} from "./customer.types";

export function CustomersTable({
    customers,
}: {
    customers: CustomerRecord[];
}) {
    if (
        customers.length ===
        0
    ) {
        return null;
    }

    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1050px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Owner wallet
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
                                    Revenue
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Updated
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>
                            {customers.map(
                                customer => (
                                    <CustomerTableRow
                                        key={
                                            customer.customerId
                                        }
                                        customer={
                                            customer
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