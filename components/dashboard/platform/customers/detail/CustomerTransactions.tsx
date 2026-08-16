import {
    ArrowUpRight,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerTransactions() {
    const transactions = [
        {
            id: "tx_01",
            description: "Pro Plan",
            amount: "$19.00",
            status: "Succeeded",
            date: "Jun 12, 2025",
        },
        {
            id: "tx_02",
            description: "Analytics Plan",
            amount: "$29.00",
            status: "Succeeded",
            date: "Jun 10, 2025",
        },
        {
            id: "tx_03",
            description: "Pro Plan",
            amount: "$19.00",
            status: "Succeeded",
            date: "May 12, 2025",
        },
    ];

    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle>
                    Recent transactions
                </CardTitle>

                <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() =>
                    //     console.log(
                    //         "View transactions"
                    //     )
                    // }
                >
                    View all
                    <ArrowUpRight />
                </Button>

            </CardHeader>

            <CardContent>

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b text-left text-muted-foreground">

                                <th className="pb-3 font-medium">
                                    Transaction
                                </th>

                                <th className="pb-3 font-medium">
                                    Date
                                </th>

                                <th className="pb-3 font-medium">
                                    Status
                                </th>

                                <th className="pb-3 text-right font-medium">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {transactions.map(
                                (transaction) => (
                                    <tr
                                        key={
                                            transaction.id
                                        }
                                        className="border-b last:border-0"
                                    >

                                        <td className="py-4">

                                            <p className="font-medium">
                                                {
                                                    transaction.description
                                                }
                                            </p>

                                            <p className="mt-1 font-mono text-xs text-muted-foreground">
                                                {
                                                    transaction.id
                                                }
                                            </p>

                                        </td>

                                        <td className="py-4 text-muted-foreground">
                                            {
                                                transaction.date
                                            }
                                        </td>

                                        <td className="py-4">

                                            <Badge variant="secondary">
                                                {
                                                    transaction.status
                                                }
                                            </Badge>

                                        </td>

                                        <td className="py-4 text-right font-medium">
                                            {
                                                transaction.amount
                                            }
                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}