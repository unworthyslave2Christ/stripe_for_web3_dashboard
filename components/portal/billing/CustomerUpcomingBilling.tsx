import Link from "next/link";

import {
    ArrowRight,
    CalendarClock,
    CreditCard,
    ShieldCheck,
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

export function CustomerUpcomingBilling({
    upcoming,
}: {
    upcoming:
        | {
            subscriptionId: number;
            planName: string;
            amount: string;
            currency: string;
            date: string;
            billingPermissionActive: boolean;
        }
        | null;
}) {
    if (!upcoming) {
        return (
            <Card>

                <CardHeader>

                    <CardTitle>
                        Upcoming billing
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="rounded-xl border border-dashed bg-muted/20 p-6 text-center">

                        <p className="text-sm font-medium">
                            No upcoming charge
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            There are currently no active subscriptions with a scheduled billing event.
                        </p>

                    </div>

                </CardContent>

            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">

            <CardHeader>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <CardTitle>
                            Upcoming billing
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your next scheduled subscription charge.
                        </p>

                    </div>

                    <Badge variant="secondary">
                        Scheduled
                    </Badge>

                </div>

            </CardHeader>

            <CardContent>

                <div className="rounded-xl border bg-muted/20 p-5">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-4">

                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">

                                <CreditCard className="size-4" />

                            </div>

                            <div>

                                <Link
                                    href={`/portal/subscriptions/${upcoming.subscriptionId}`}
                                    className="font-medium hover:underline"
                                >
                                    {upcoming.planName}
                                </Link>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Subscription #{upcoming.subscriptionId}
                                </p>

                                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">

                                    <CalendarClock className="size-4" />

                                    {upcoming.date}

                                </p>

                            </div>

                        </div>

                        <div className="text-left lg:text-right">

                            <p className="text-2xl font-semibold">
                                {upcoming.currency}{" "}
                                {upcoming.amount}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Next scheduled charge
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">

                            <ShieldCheck
                                className={
                                    upcoming.billingPermissionActive
                                        ? "size-3.5 text-emerald-600 dark:text-emerald-400"
                                        : "size-3.5"
                                }
                            />

                            {upcoming.billingPermissionActive
                                ? "Billing authorization active"
                                : "Billing authorization unavailable"}

                        </div>

                        <Button
                            render={
                                <Link href={`/portal/subscriptions/${upcoming.subscriptionId}`}>
                                    View subscription
                                    <ArrowRight />
                                </Link>
                            }
                            variant="outline"
                            size="sm"
                        />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}