import Link from "next/link";

import {
    ArrowRight,
    CalendarClock,
    CreditCard,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerSubscriptionSummary({
    total,
    active,
    paused,
    cancelled,
}: {
    total: number;

    active: number;

    paused: number;

    cancelled: number;
}) {
    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-3">

                    <CardTitle>
                        Subscriptions
                    </CardTitle>

                    <Button
                        render={
                            <Link href="/portal/subscriptions">
                                View all
                                <ArrowRight />
                            </Link>
                        }
                        size="sm"
                        variant="ghost"
                    />

                </div>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="flex items-center gap-3">

                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">

                        <CreditCard className="size-5 text-muted-foreground" />

                    </div>

                    <div>

                        <p className="text-2xl font-semibold">
                            {total}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Total subscriptions
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-3 gap-2">

                    <SummaryMetric
                        label="Active"
                        value={active}
                        variant="secondary"
                    />

                    <SummaryMetric
                        label="Paused"
                        value={paused}
                        variant="outline"
                    />

                    <SummaryMetric
                        label="Cancelled"
                        value={cancelled}
                        variant="outline"
                    />

                </div>

                <div className="flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">

                    <CalendarClock className="size-3.5" />

                    Subscription billing is managed through your Smart Account.

                </div>

            </CardContent>

        </Card>
    );
}

function SummaryMetric({
    label,
    value,
    variant,
}: {
    label: string;

    value: number;

    variant:
        | "secondary"
        | "outline";
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-3">

            <p className="text-lg font-semibold">
                {value}
            </p>

            <Badge
                variant={variant}
                className="mt-2"
            >
                {label}
            </Badge>

        </div>
    );
}