import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SubscriptionChart({
    values,
    demo,
}: {
    values:
        number[];

    demo:
        boolean;
}) {
    const max =
        Math.max(
            ...values,
            1,
        );

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
                        (
                            value,
                            index,
                        ) => (
                            <div
                                key={
                                    index
                                }
                                className="flex h-full flex-1 items-end"
                            >
                                <div
                                    className="w-full rounded-t-sm bg-secondary-foreground/70 transition-[height] duration-700"
                                    style={{
                                        height:
                                            `${(
                                                value /
                                                max
                                            ) * 100}%`,
                                    }}
                                    title={
                                        value.toLocaleString()
                                    }
                                />
                            </div>
                        ),
                    )}

                </div>

                {demo && (
                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Test-mode historical series.
                    </p>
                )}

            </CardContent>

        </Card>
    );
}