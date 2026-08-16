import {
    ArrowUpRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanRevenueChart() {
    return (
        <Card>

            <CardHeader className="flex flex-row items-start justify-between">

                <CardTitle>
                    Revenue trend
                </CardTitle>

                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="size-3" />
                    18.3%
                </div>

            </CardHeader>

            <CardContent>

                <div className="h-64 rounded-lg border bg-muted/20 p-5">

                    <svg
                        viewBox="0 0 800 240"
                        className="h-full w-full"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 190 C60 180 90 170 130 175 C180 181 205 142 250 151 C300 160 320 127 370 133 C420 138 450 101 500 111 C550 121 590 77 630 92 C670 107 720 57 800 32"
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