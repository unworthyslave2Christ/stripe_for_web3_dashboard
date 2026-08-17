import Link from "next/link";

import {
    ArrowRight,
    Bell,
    CalendarClock,
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
} from "@/components/ui/card";

import {
    CustomerNotificationStatusBadge,
} from "./CustomerNotificationStatusBadge";

import {
    CustomerNotificationTypeBadge,
} from "./CustomerNotificationTypeBadge";

import type {
    CustomerNotificationRecord,
} from "./customer-notification.types";

export function CustomerNotificationListItem({
    notification,
}: {
    notification: CustomerNotificationRecord;
}) {
    const unread =
        notification.status !== "READ";

    return (
        <Card
            className={
                unread
                    ? "border-primary/20"
                    : undefined
            }
        >

            <CardContent className="p-5">

                <div className="flex items-start gap-4">

                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">

                        <Bell className="size-4 text-muted-foreground" />

                        {unread && (
                            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
                        )}

                    </div>

                    <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">

                            <div>

                                <div className="flex flex-wrap items-center gap-2">

                                    <p className="text-sm font-semibold">
                                        {notification.title}
                                    </p>

                                    <CustomerNotificationTypeBadge
                                        type={
                                            notification.type
                                        }
                                    />

                                    <CustomerNotificationStatusBadge
                                        status={
                                            notification.status
                                        }
                                    />

                                </div>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {notification.description}
                                </p>

                            </div>

                            <p className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">

                                <CalendarClock className="size-3.5" />

                                {notification.createdAt}

                            </p>

                        </div>

                        {notification.relatedPlanName && (
                            <Badge
                                variant="outline"
                                className="mt-3"
                            >
                                {notification.relatedPlanName}
                            </Badge>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">

                            <Button
                                variant={
                                    unread
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                            >
                                {unread
                                    ? "Mark as read"
                                    : "Read"}
                            </Button>

                            {notification.relatedSubscriptionId && (
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
                            )}

                        </div>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}