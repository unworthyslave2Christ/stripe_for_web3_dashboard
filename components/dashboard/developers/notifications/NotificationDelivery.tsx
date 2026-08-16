import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import type {
    NotificationDeliveryStatus,
} from "./notification.types";

export function NotificationDelivery({
    status,
}: {
    status: NotificationDeliveryStatus;
}) {
    switch (status) {
        case "SUCCEEDED":
            return (
                <div className="flex items-center gap-2">

                    <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />

                    <span className="text-sm">
                        Healthy
                    </span>

                </div>
            );

        case "PENDING":
            return (
                <div className="flex items-center gap-2">

                    <Clock3 className="size-4 text-amber-600 dark:text-amber-400" />

                    <span className="text-sm">
                        Pending
                    </span>

                </div>
            );

        case "FAILED":
            return (
                <div className="flex items-center gap-2">

                    <AlertTriangle className="size-4 text-destructive" />

                    <span className="text-sm">
                        Failed
                    </span>

                </div>
            );
    }
}