import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function BillingRevenueChart({
    available,
}: {
    available: boolean;
}) {
    return (
        <Card className="xl:col-span-2">

            <CardHeader>

                <CardTitle>
                    Billing volume
                </CardTitle>

                <CardDescription>
                    Successful and failed billing activity over
                    the selected period.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {available ? (
                    <div className="h-[280px] rounded-lg border bg-muted/20" />
                ) : (
                    <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed bg-muted/10">

                        <p className="max-w-sm text-center text-sm text-muted-foreground">
                            Billing volume will appear here once
                            billing history is exposed by the
                            merchant API.
                        </p>

                    </div>
                )}

            </CardContent>

        </Card>
    );
}