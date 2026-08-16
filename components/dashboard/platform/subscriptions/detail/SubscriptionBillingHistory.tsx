import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Badge,
} from "@/components/ui/badge";

const payments = [
    {
        id: "bill_001",
        date: "Jun 12, 2025",
        amount: "$19.00",
        status: "Succeeded",
    },
    {
        id: "bill_002",
        date: "May 12, 2025",
        amount: "$19.00",
        status: "Succeeded",
    },
    {
        id: "bill_003",
        date: "Apr 12, 2025",
        amount: "$19.00",
        status: "Succeeded",
    },
];

export function SubscriptionBillingHistory() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Billing history
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b text-left text-muted-foreground">

                                <th className="pb-3 font-medium">
                                    Billing event
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

                            {payments.map((payment) => (
                                <tr
                                    key={payment.id}
                                    className="border-b last:border-0"
                                >

                                    <td className="py-4">

                                        <p className="font-medium">
                                            Recurring billing
                                        </p>

                                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                                            {payment.id}
                                        </p>

                                    </td>

                                    <td className="py-4 text-muted-foreground">
                                        {payment.date}
                                    </td>

                                    <td className="py-4">

                                        <Badge variant="secondary">
                                            {payment.status}
                                        </Badge>

                                    </td>

                                    <td className="py-4 text-right font-medium">
                                        {payment.amount}
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}