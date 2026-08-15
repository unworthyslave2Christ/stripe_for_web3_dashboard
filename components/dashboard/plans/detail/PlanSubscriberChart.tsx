import {
    TrendingUp,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanSubscriberChart() {
    const values = [
        31,
        38,
        35,
        42,
        48,
        51,
        58,
        63,
        61,
        68,
        72,
        76,
    ];

    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between">

                    <CardTitle>
                        Subscriber growth
                    </CardTitle>

                    <TrendingUp className="size-4 text-emerald-500" />

                </div>

            </CardHeader>

            <CardContent>

                <div className="h-64 rounded-lg border bg-muted/20 p-5">

                    <div className="flex h-full items-end gap-2">

                        {values.map(
                            (height, index) => (
                                <div
                                    key={index}
                                    className="flex h-full flex-1 items-end"
                                >
                                    <div
                                        className="w-full rounded-t-sm bg-primary/70 transition-colors hover:bg-primary"
                                        style={{
                                            height: `${height}%`,
                                        }}
                                    />
                                </div>
                            ),
                        )}

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}