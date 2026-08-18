import {
    BellOff,
} from "lucide-react";

export function CustomerNotificationsEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <BellOff className="size-5 text-muted-foreground" />

            </div>

            <h3 className="mt-4 text-base font-semibold">
                No notifications
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Notifications about billing, subscriptions, and your Smart Account will appear here.
            </p>

        </div>
    );
}