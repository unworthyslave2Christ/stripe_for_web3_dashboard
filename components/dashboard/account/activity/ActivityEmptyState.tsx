import {
    Activity,
} from "lucide-react";

export function ActivityEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Activity className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-base font-semibold">
                No activity
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Events will appear here as activity occurs across your merchant account.
            </p>

        </div>
    );
}