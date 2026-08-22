import Link from "next/link";

import {
    AlertTriangle,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlanDetailLoadingState() {
    return (
        <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-9 w-72 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded-xl border bg-muted/40" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="h-32 animate-pulse rounded-xl border bg-muted/40"
                        />
                    ),
                )}
            </div>
        </div>
    );
}

export function PlanDetailNotFoundState({
    planId,
}: {
    planId: number;
}) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
            <h2 className="text-lg font-semibold">
                Plan not found
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Plan #{planId} is not available through the current merchant API.
            </p>

            <Button
                render={
                    <Link
                        href="/dashboard/platform/plans"
                    >
                        Back to plans
                    </Link>
                }
                className="mt-5"
                variant="outline"
            />
        </div>
    );
}

export function PlanDetailErrorState({
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

            <h2 className="mt-4 text-lg font-semibold">
                Unable to load plan
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {error.message}
            </p>

            <Button
                variant="outline"
                className="mt-5"
                onClick={onRetry}
            >
                <RefreshCw />
                Try again
            </Button>
        </div>
    );
}