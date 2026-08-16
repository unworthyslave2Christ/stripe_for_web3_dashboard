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

export function BillingRevenueChart() {
    return (
        <Card className="xl:col-span-2">

            <CardHeader className="flex flex-row items-start justify-between gap-4">

                <div>

                    <CardTitle>
                        Billing volume
                    </CardTitle>

                    <CardDescription>
                        Successful and failed billing activity over the selected period.
                    </CardDescription>

                </div>

                <div className="text-right">

                    <p className="text-lg font-semibold">
                        $48,214
                    </p>

                    <p className="flex items-center justify-end gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="size-3" />
                        16.4%
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
                                d="M0 195 C60 185 85 170 130 175 C180 181 205 145 250 150 C300 156 320 120 370 130 C420 140 455 92 500 105 C550 118 590 70 630 85 C680 100 725 55 800 28"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                                className="text-primary"
                            />

                            <path
                                d="M0 210 C100 202 160 208 230 200 C320 192 390 205 470 190 C560 176 650 188 800 165"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                                vectorEffect="non-scaling-stroke"
                                className="text-destructive/60"
                            />

                        </svg>

                    </div>

                </div>

                <div className="mt-3 flex items-center justify-center gap-5 text-xs text-muted-foreground">

                    <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary" />
                        Successful
                    </span>

                    <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-destructive/60" />
                        Failed
                    </span>

                </div>

            </CardContent>

        </Card>
    );
}