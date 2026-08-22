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

export function NotificationsDeliveryChart({
    successRate,
}: {
    successRate: number;
}) {
    return (
        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                    <CardTitle>
                        Delivery performance
                    </CardTitle>

                    <CardDescription>
                        Aggregate notification delivery performance.
                    </CardDescription>
                </div>

                <div className="text-right">
                    <p className="text-lg font-semibold">
                        {successRate}%
                    </p>

                    <p className="flex items-center justify-end gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="size-3" />
                        Healthy
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                <div className="h-[280px] rounded-lg border bg-muted/20 p-4">
                    <svg
                        viewBox="0 0 800 220"
                        className="h-full w-full"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label="Notification delivery performance"
                    >
                        <path
                            d="M0 150 C60 144 100 148 145 134 C190 120 220 134 265 116 C310 98 345 121 390 94 C440 66 480 86 525 70 C570 54 615 71 655 48 C710 24 755 45 800 22"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-primary"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>
            </CardContent>
        </Card>
    );
}