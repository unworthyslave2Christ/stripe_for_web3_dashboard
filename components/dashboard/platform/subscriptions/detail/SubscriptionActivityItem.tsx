import type {
    LucideIcon,
} from "lucide-react";

export function SubscriptionActivityItem({
    title,
    description,
    time,
    icon: Icon,
}: {
    title: string;
    description: string;
    time: string;
    icon: LucideIcon;
}) {
    return (
        <div className="flex gap-3 border-b py-4 first:pt-0 last:border-0 last:pb-0">

            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Icon className="size-4 text-muted-foreground" />
            </div>

            <div className="flex-1">

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm font-medium">
                        {title}
                    </p>

                    <span className="text-xs text-muted-foreground">
                        {time}
                    </span>

                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}