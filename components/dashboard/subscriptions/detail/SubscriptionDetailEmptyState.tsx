import {
    CreditCard,
} from "lucide-react";

export function SubscriptionDetailEmptyState() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

            <div className="flex size-12 items-center justify-center rounded-full border bg-muted/30">
                <CreditCard className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Subscription not found
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                This subscription does not exist or is no longer available.
            </p>

        </div>
    );
}