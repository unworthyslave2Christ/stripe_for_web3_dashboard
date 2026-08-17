import {
    AlertTriangle,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerBillingErrorState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">

                <AlertTriangle className="size-5 text-destructive" />

            </div>

            <h3 className="mt-4 text-base font-semibold">
                Unable to load billing
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                We couldn't retrieve your billing history.
            </p>

            <Button
                variant="outline"
                className="mt-5"
            >
                <RefreshCw />
                Try again
            </Button>

        </div>
    );
}