import Link from "next/link";

import {
    ArrowRight,
    CircleDollarSign,
    CheckCircle2,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerBillingCard() {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">
                    <CircleDollarSign className="size-4" />
                    Billing
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                <div>

                    <p className="text-sm text-muted-foreground">
                        Total billed
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                        $84.00
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-3">

                    <BillingMetric
                        icon={CheckCircle2}
                        label="Successful"
                        value="6"
                    />

                    <BillingMetric
                        icon={XCircle}
                        label="Failed"
                        value="0"
                    />

                </div>

                <Link
                    href="/portal/billing"
                    className="flex items-center justify-center gap-2 text-sm font-medium hover:underline"
                >
                    View billing
                    <ArrowRight className="size-4" />
                </Link>

            </CardContent>

        </Card>
    );
}

function BillingMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof CheckCircle2;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-3">

            <Icon className="size-4 text-muted-foreground" />

            <p className="mt-2 text-lg font-semibold">
                {value}
            </p>

            <p className="text-xs text-muted-foreground">
                {label}
            </p>

        </div>
    );
}