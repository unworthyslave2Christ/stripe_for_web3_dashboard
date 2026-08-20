import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerChart({
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
                    Customers
                </CardTitle>

                <CardDescription>
                    Customer growth over the selected period.
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="relative h-48">

                    <div className="absolute inset-x-0 top-0 border-t border-dashed" />
                    <div className="absolute inset-x-0 top-1/4 border-t border-dashed" />
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed" />
                    <div className="absolute inset-x-0 top-3/4 border-t border-dashed" />
                    <div className="absolute inset-x-0 bottom-0 border-t" />

                    <div className="absolute inset-0 flex items-end">

                        {values.map(
                            (
                                value,
                                index,
                            ) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="flex h-full flex-1 items-end px-0.5"
                                >
                                    <div
                                        className="w-full rounded-t bg-primary/30 transition-[height] duration-700 hover:bg-primary/60"
                                        style={{
                                            height:
                                                `${(
                                                    value /
                                                    max
                                                ) * 100}%`,
                                        }}
                                    />
                                </div>
                            ),
                        )}

                    </div>

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