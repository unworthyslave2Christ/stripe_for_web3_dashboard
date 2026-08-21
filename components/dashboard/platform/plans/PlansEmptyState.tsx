import {
    Layers3,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlansEmptyState() {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Layers3 className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
                No billing plans yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                No plans were returned for this merchant.
                Plan creation will become available when the
                corresponding merchant operation is exposed through
                the application workflow.
            </p>

            <Button
                className="mt-5"
                disabled
            >
                Create plan
            </Button>

        </div>
    );
}