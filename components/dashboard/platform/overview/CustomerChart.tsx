import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export function CustomerChart() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Customers
                </CardTitle>

                <CardDescription>
                    Customer growth this year.
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

                        {[25, 31, 35, 42, 49, 55, 63, 70, 77, 84, 92, 100].map(
                            (height, index) => (
                                <div
                                    key={index}
                                    className="flex h-full flex-1 items-end px-0.5"
                                >
                                    <div
                                        className="w-full rounded-t bg-primary/30 transition-colors hover:bg-primary/60"
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