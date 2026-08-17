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
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerSubscriptionCard() {
    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-4">

                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="size-4" />
                        Active subscriptions
                    </CardTitle>

                    <Badge variant="secondary">
                        2 active
                    </Badge>

                </div>

            </CardHeader>

            <CardContent className="space-y-3">

                <SubscriptionRow
                    name="Pro"
                    amount="$19"
                    interval="month"
                    nextBilling="Jun 12"
                    href="/portal/subscriptions"
                />

                <SubscriptionRow
                    name="Analytics"
                    amount="$9"
                    interval="month"
                    nextBilling="Jun 20"
                    href="/portal/subscriptions"
                />

                <Link
                    href="/portal/subscriptions"
                    className="mt-2 flex items-center justify-center gap-2 text-sm font-medium hover:underline"
                >
                    View all subscriptions
                    <ArrowRight className="size-4" />
                </Link>

            </CardContent>

        </Card>
    );
}

function SubscriptionRow({
    name,
    amount,
    interval,
    nextBilling,
    href,
}: {
    name: string;
    amount: string;
    interval: string;
    nextBilling: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="block rounded-lg border p-4 transition-colors hover:bg-muted/30"
        >

            <div className="flex items-center justify-between gap-4">

                <div>

                    <p className="text-sm font-medium">
                        {name}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {amount}/{interval}
                    </p>

                </div>

                <div className="text-right">

                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarClock className="size-3.5" />
                        {nextBilling}
                    </p>

                </div>

            </div>

        </Link>
    );
}