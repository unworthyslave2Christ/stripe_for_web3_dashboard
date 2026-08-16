import {
    Badge,
} from "@/components/ui/badge";

import type {
    WebhookEvent,
} from "./webhook.types";

export function WebhookEvents({
    events,
}: {
    events: WebhookEvent[];
}) {
    return (
        <div className="flex flex-wrap gap-1">

            {events
                .slice(0, 2)
                .map((event) => (
                    <Badge
                        key={event}
                        variant="secondary"
                        className="font-mono text-[10px]"
                    >
                        {event}
                    </Badge>
                ))}

            {events.length > 2 && (
                <Badge
                    variant="outline"
                    className="text-[10px]"
                >
                    +{events.length - 2}
                </Badge>
            )}

        </div>
    );
}