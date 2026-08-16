import {
    Webhook,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function WebhooksEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <Webhook className="size-5 text-muted-foreground" />

            </div>

            <h3 className="mt-4 text-base font-semibold">
                No webhook endpoints
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Create an endpoint to receive real-time events from your merchant billing infrastructure.
            </p>

            <Button className="mt-5">
                Create endpoint
            </Button>

        </div>
    );
}