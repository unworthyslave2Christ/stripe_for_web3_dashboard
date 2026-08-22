import {
    NotificationIdentity,
} from "./NotificationIdentity";

import {
    NotificationChannel,
} from "./NotificationChannel";

import {
    NotificationTrigger,
} from "./NotificationTrigger";

import {
    NotificationStatusBadge,
} from "./NotificationStatusBadge";

import {
    NotificationDelivery,
} from "./NotificationDelivery";

import {
    NotificationLastSent,
} from "./NotificationLastSent";

import {
    NotificationActions,
} from "./NotificationActions";

import type {
    NotificationRecord,
} from "./notification.types";

export function NotificationTableRow({
    notification,
}: {
    notification: NotificationRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">
            <td className="px-4 py-4">
                <NotificationIdentity
                    notification={
                        notification
                    }
                />
            </td>

            <td className="px-4 py-4">
                <NotificationChannel
                    channel={
                        notification.channel
                    }
                />
            </td>

            <td className="px-4 py-4">
                <NotificationTrigger
                    trigger={
                        notification.trigger
                    }
                />
            </td>

            <td className="px-4 py-4">
                <NotificationStatusBadge
                    status={
                        notification.status
                    }
                />
            </td>

            <td className="px-4 py-4">
                <NotificationDelivery
                    status={
                        notification.deliveryStatus
                    }
                />
            </td>

            <td className="px-4 py-4">
                <NotificationLastSent
                    value={
                        notification.lastSentAt
                    }
                />
            </td>

            <td className="px-4 py-4 text-right">
                <NotificationActions
                    notificationId={
                        notification.notificationId
                    }
                />
            </td>
        </tr>
    );
}