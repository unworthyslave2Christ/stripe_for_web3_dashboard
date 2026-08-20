import {
    AlertTriangle,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerBillingErrorState({
    error,
    onRetry,
}: {
    error: Error;

    onRetry: () => void;
}) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">

                <AlertTriangle className="size-5 text-destructive" />

            </div>

            <h1 className="mt-4 text-lg font-semibold">
                Unable to load billing
            </h1>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {error.message}
            </p>

            <Button
                variant="outline"
                className="mt-5"
                onClick={
                    onRetry
                }
            >
                <RefreshCw />
                Try again
            </Button>

        </div>
    );
}