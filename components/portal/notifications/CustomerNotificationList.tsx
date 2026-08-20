import type {
    CustomerNotificationRecord,
} from "@/types/customer-notification";

import {
    CustomerNotificationListItem,
} from "./CustomerNotificationListItem";

export function CustomerNotificationList({
    notifications,
    onMarkRead,
}: {
    notifications:
        CustomerNotificationRecord[];

    onMarkRead:
        (
            notificationId: string,
        ) => void;
}) {
    if (
        notifications.length ===
        0
    ) {
        return (
            <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                <p className="text-sm font-medium">
                    No notifications found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or notification filters.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-3">

            {notifications.map(
                (
                    notification,
                ) => (
                    <CustomerNotificationListItem
                        key={
                            notification.id
                        }
                        notification={
                            notification
                        }
                        onMarkRead={
                            onMarkRead
                        }
                    />
                ),
            )}

        </div>
    );
}