import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Button,
} from "@/components/ui/button";

const revenue = [
    28000,
    31000,
    29000,
    35000,
    33000,
    39000,
    42000,
    41000,
    45000,
    43000,
    47000,
    45231,
];

export function RevenueChart() {
    const max = Math.max(...revenue);

    return (
        <Card className="xl:col-span-2">

            <CardHeader className="flex flex-row items-start justify-between gap-4">

                <div>
                    <CardTitle>
                        Revenue
                    </CardTitle>

                    <CardDescription>
                        Recurring revenue over the last 12 months.
                    </CardDescription>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                >
                    Last 12 months
                </Button>

            </CardHeader>

            <CardContent>

                <div className="h-72">

                    <div className="flex h-full items-end gap-2">

                        {revenue.map(
                            (value, index) => {

                                const height =
                                    `${(value / max) * 100}%`;

                                return (
                                    <div
                                        key={index}
                                        className="group flex h-full flex-1 items-end"
                                    >
                                        <div
                                            className="w-full rounded-t-md bg-primary/80 transition-all group-hover:bg-primary"
                                            style={{
                                                height,
                                            }}
                                        />
                                    </div>
                                );
                            },
                        )}

                    </div>

                </div>

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                </div>

            </CardContent>

        </Card>
    );
}