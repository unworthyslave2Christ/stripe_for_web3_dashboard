import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

const values = [
    1020,
    1110,
    1190,
    1280,
    1350,
    1420,
    1510,
    1610,
    1700,
    1780,
    1840,
    1892,
];

export function SubscriptionChart() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Subscriptions
                </CardTitle>

                <CardDescription>
                    Active subscriptions over time.
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="flex h-48 items-end gap-1.5">

                    {values.map(
                        (value, index) => {

                            const height =
                                `${(value / 1892) * 100}%`;

                            return (
                                <div
                                    key={index}
                                    className="flex h-full flex-1 items-end"
                                >
                                    <div
                                        className="w-full rounded-t-sm bg-secondary-foreground/70"
                                        style={{
                                            height,
                                        }}
                                    />
                                </div>
                            );
                        },
                    )}

                </div>

            </CardContent>

        </Card>
    );
}