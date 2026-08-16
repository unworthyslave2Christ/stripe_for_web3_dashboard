import {
    CalendarClock,
} from "lucide-react";

export function WebhookLastDelivery({
    value,
}: {
    value: string | null;
}) {
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">

            <CalendarClock className="size-3.5" />

            <span>
                {value || "Never"}
            </span>

        </div>
    );
}