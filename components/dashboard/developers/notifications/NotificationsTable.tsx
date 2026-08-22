import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    NotificationTableRow,
} from "./NotificationTableRow";

import type {
    NotificationRecord,
} from "./notification.types";

export function NotificationsTable({
    notifications,
}: {
    notifications: NotificationRecord[];
}) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1200px]">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Notification
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Channel
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Trigger
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Delivery
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Last sent
                                </th>

                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {notifications.length ===
                            0 ? (
                                <tr>
                                    <td
                                        colSpan={
                                            7
                                        }
                                        className="px-4 py-12 text-center"
                                    >
                                        <p className="text-sm font-medium">
                                            No notifications found
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Adjust the search or filters.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                notifications.map(
                                    (
                                        notification,
                                    ) => (
                                        <NotificationTableRow
                                            key={
                                                notification.id
                                            }
                                            notification={
                                                notification
                                            }
                                        />
                                    ),
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}