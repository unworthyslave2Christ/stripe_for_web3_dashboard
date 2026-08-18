import {
    ReceiptText,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerBillingEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <ReceiptText className="size-5 text-muted-foreground" />

            </div>

            <h3 className="mt-4 text-base font-semibold">
                No billing history
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Billing activity will appear here after your first subscription charge.
            </p>

            <Button
                variant="outline"
                className="mt-5"
            >
                View subscriptions
            </Button>

        </div>
    );
}