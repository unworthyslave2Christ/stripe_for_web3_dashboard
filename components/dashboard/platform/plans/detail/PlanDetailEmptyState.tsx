import {
    Layers3,
} from "lucide-react";

export function PlanDetailEmptyState() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

            <div className="flex size-12 items-center justify-center rounded-full border bg-muted/30">
                <Layers3 className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Plan not found
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                This plan doesn't exist or is no longer available.
            </p>

        </div>
    );
}