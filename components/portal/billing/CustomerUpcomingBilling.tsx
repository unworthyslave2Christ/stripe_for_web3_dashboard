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

export function CustomerUpcomingBilling() {
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
                                    href="/portal/subscriptions"
                                    className="font-medium hover:underline"
                                >
                                    Pro subscription
                                </Link>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Subscription #10021
                                </p>

                                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">

                                    <CalendarClock className="size-4" />

                                    Jun 12, 2025

                                </p>

                            </div>

                        </div>

                        <div className="text-left lg:text-right">

                            <p className="text-2xl font-semibold">
                                $19.00
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Monthly recurring charge
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">

                            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />

                            Billing authorization active

                        </div>

                        <Button
                            render={
                                <Link href="/portal/subscriptions">
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