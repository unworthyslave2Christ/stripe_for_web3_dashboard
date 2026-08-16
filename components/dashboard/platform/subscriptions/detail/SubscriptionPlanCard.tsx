import Link from "next/link";

import {
    CalendarClock,
    ExternalLink,
    Layers3,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SubscriptionPlanCardProps {
    subscription: {
        planId: number;
        planName: string;
        amount: string;
        currency: string;
        interval: string;
    };
}

export function SubscriptionPlanCard({
    subscription,
}: SubscriptionPlanCardProps) {
    return (
        <Card>

            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Layers3 className="size-4" />
                    Plan
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

                <div>
                    <Link
                        href={`/dashboard/plans/${subscription.planId}`}
                        className="text-lg font-semibold hover:underline"
                    >
                        {subscription.planName}
                    </Link>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Plan #{subscription.planId}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-lg border bg-muted/20 p-3">

                        <p className="text-xs text-muted-foreground">
                            Amount
                        </p>

                        <p className="mt-2 text-lg font-semibold">
                            {subscription.currency}{" "}
                            {subscription.amount}
                        </p>

                    </div>

                    <div className="rounded-lg border bg-muted/20 p-3">

                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarClock className="size-3.5" />
                            Interval
                        </p>

                        <p className="mt-2 text-sm font-medium">
                            {formatInterval(
                                subscription.interval,
                            )}
                        </p>

                    </div>

                </div>

                <Button
                    render={
                        <Link
                            href={`/dashboard/plans/${subscription.planId}`}
                        >
                            View plan
                            <ExternalLink />
                        </Link>
                    }
                    variant="outline"
                    className="w-full"
                >
                   
                </Button>

            </CardContent>

        </Card>
    );
}

function formatInterval(
    interval: string,
) {
    switch (interval) {
        case "DAY":
            return "Daily";

        case "WEEK":
            return "Weekly";

        case "YEAR":
            return "Yearly";

        default:
            return "Monthly";
    }
}