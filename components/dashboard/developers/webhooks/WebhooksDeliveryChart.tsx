import {
    ArrowUpRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function WebhooksDeliveryChart({
    successRate,
    available,
}: {
    successRate: number;

    available: boolean;
}) {
    return (
        <Card className="xl:col-span-2">

            <CardHeader className="flex flex-row items-start justify-between gap-4">

                <div>

                    <CardTitle>
                        Delivery performance
                    </CardTitle>

                    <CardDescription>
                        Webhook delivery success over the selected period.
                    </CardDescription>

                </div>

                <div className="text-right">

                    <p className="text-lg font-semibold">
                        {available
                            ? `${successRate}%`
                            : "—"}
                    </p>

                    {available && (
                        <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                            <ArrowUpRight className="size-3" />
                            Delivery history available
                        </p>
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <div className="flex h-[280px] items-center justify-center rounded-lg border bg-muted/20">

                    <div className="text-center">

                        <p className="text-sm font-medium">
                            {available
                                ? "Delivery analytics"
                                : "Delivery analytics unavailable"}
                        </p>

                        <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                            {available
                                ? "Historical webhook delivery metrics are available for this merchant."
                                : "The current merchant SDK does not yet expose webhook delivery history."}
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}