import {
    CalendarClock,
    CircleDollarSign,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanPricingCard({
    amount,
    currency,
    interval,
}: {
    amount: string;
    currency: string;
    interval: string;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CircleDollarSign className="size-4" />
                    Pricing
                </CardTitle>
            </CardHeader>

            <CardContent>

                <p className="text-3xl font-semibold tracking-tight">
                    {currency} {amount}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarClock className="size-4" />

                    Every {formatInterval(interval)}
                </div>

            </CardContent>

        </Card>
    );
}

function formatInterval(
    interval: string,
) {
    switch (interval) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "YEAR":
            return "year";

        default:
            return "month";
    }
}