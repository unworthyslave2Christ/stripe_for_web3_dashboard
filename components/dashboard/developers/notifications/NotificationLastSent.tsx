import {
    CalendarClock,
} from "lucide-react";

export function NotificationLastSent({
    value,
}: {
    value: Date | null;
}) {
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="size-3.5" />

            <span>
                {value
                    ? value.toLocaleString()
                    : "Never"}
            </span>
        </div>
    );
}