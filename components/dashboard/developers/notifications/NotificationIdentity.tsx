import Link from "next/link";

import {
    Bell,
} from "lucide-react";

import type {
    NotificationRecord,
} from "./notification.types";

export function NotificationIdentity({
    notification,
}: {
    notification: NotificationRecord;
}) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                <Bell className="size-4 text-muted-foreground" />

            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/notifications/${notification.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {notification.name}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {notification.notificationId}
                </p>

            </div>

        </div>
    );
}