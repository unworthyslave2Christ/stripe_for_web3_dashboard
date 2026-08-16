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

export function WebhooksDeliveryChart() {
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
                        99.2%
                    </p>

                    <p className="flex items-center justify-end gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="size-3" />
                        0.6%
                    </p>

                </div>

            </CardHeader>

            <CardContent>

                <div className="h-[280px] rounded-lg border bg-muted/20 p-4">

                    <div className="relative h-full">

                        <div className="absolute inset-x-0 top-1/4 border-t border-dashed" />
                        <div className="absolute inset-x-0 top-1/2 border-t border-dashed" />
                        <div className="absolute inset-x-0 top-3/4 border-t border-dashed" />

                        <svg
                            viewBox="0 0 800 220"
                            className="absolute inset-0 h-full w-full"
                            preserveAspectRatio="none"
                        >

                            <path
                                d="M0 155 C60 150 95 148 140 140 C185 132 215 143 260 120 C310 95 350 120 390 100 C440 74 480 100 520 76 C560 52 610 76 650 54 C700 34 750 52 800 25"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-primary"
                                vectorEffect="non-scaling-stroke"
                            />

                        </svg>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}