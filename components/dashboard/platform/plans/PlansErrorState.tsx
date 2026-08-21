import {
    AlertTriangle,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlansErrorState({
    error,
    onRetry,
}: {
    error: Error;
    onRetry: () => void;
}) {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">

            <p className="text-sm font-medium">
                Unable to load plans
            </p>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {error.message}
            </p>

            <Button
                className="mt-5"
                variant="outline"
                onClick={onRetry}
            >
                Refresh
            </Button>

        </div>
    );
}