import {
    ArrowUpRight,
    CreditCard,
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

export function CustomerSubscriptionSummary() {
    const subscriptions = [
        {
            name: "Pro Plan",
            amount: "$19.00",
            status: "Active",
            nextBilling: "Jun 12, 2025",
        },
        {
            name: "Analytics Plan",
            amount: "$29.00",
            status: "Active",
            nextBilling: "Jun 15, 2025",
        },
    ];

    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="size-4" />
                    Subscriptions
                </CardTitle>

                <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() =>
                    //     console.log(
                    //         "View subscriptions"
                    //     )
                    // }
                >
                    View all
                    <ArrowUpRight />
                </Button>

            </CardHeader>

            <CardContent className="space-y-3">

                {subscriptions.map(
                    (subscription) => (
                        <div
                            key={
                                subscription.name
                            }
                            className="flex items-center justify-between gap-4 rounded-lg border p-3"
                        >

                            <div className="min-w-0">

                                <p className="truncate text-sm font-medium">
                                    {
                                        subscription.name
                                    }
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Next billing{" "}
                                    {
                                        subscription.nextBilling
                                    }
                                </p>

                            </div>

                            <div className="shrink-0 text-right">

                                <p className="text-sm font-medium">
                                    {
                                        subscription.amount
                                    }
                                </p>

                                <Badge
                                    variant="secondary"
                                    className="mt-1"
                                >
                                    {
                                        subscription.status
                                    }
                                </Badge>

                            </div>

                        </div>
                    )
                )}

            </CardContent>

        </Card>
    );
}