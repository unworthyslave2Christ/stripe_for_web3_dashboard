import {
    ArrowUpRight,
    CircleDollarSign,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerBillingSummary() {
    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle className="flex items-center gap-2">
                    <CircleDollarSign className="size-4" />
                    Billing summary
                </CardTitle>

                <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() =>
                    //     console.log(
                    //         "View billing"
                    //     )
                    // }
                >
                    Billing
                    <ArrowUpRight />
                </Button>

            </CardHeader>

            <CardContent className="space-y-4">

                <BillingRow
                    label="Lifetime billed"
                    value="$1,284.00"
                />

                <BillingRow
                    label="Successful payments"
                    value="42"
                />

                <BillingRow
                    label="Failed payments"
                    value="1"
                />

                <BillingRow
                    label="Refunded"
                    value="$0.00"
                />

            </CardContent>

        </Card>
    );
}

function BillingRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-medium">
                {value}
            </span>

        </div>
    );
}