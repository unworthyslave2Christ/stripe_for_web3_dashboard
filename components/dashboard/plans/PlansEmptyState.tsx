import {
    Layers3,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlansEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Layers3 className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-base font-semibold">
                No plans yet
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Create your first billing plan to begin accepting recurring subscriptions.
            </p>

            <Button className="mt-5">
                Create plan
            </Button>

        </div>
    );
}