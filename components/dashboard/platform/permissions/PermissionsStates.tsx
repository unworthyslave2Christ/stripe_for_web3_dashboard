import {
    AlertTriangle,
    KeyRound,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import Link from "next/link";

////////////////////////////////////////////////////////////
// LOADING
////////////////////////////////////////////////////////////

export function PermissionsLoadingState() {
    return (
        <div className="space-y-6">

            <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-9 w-64 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({
                    length: 4,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-32 animate-pulse rounded-xl border bg-card"
                    />
                ))}

            </div>

            <div className="h-72 animate-pulse rounded-xl border bg-card" />

        </div>
    );
}

////////////////////////////////////////////////////////////
// ERROR
////////////////////////////////////////////////////////////

export function PermissionsErrorState({
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
                Unable to load merchant account
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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

////////////////////////////////////////////////////////////
// UNSUPPORTED
////////////////////////////////////////////////////////////

export function PermissionsUnsupportedState() {
    return (
        <Card>
            <CardContent className="p-8">

                <div className="mx-auto flex max-w-xl flex-col items-center text-center">

                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                        <KeyRound className="size-5 text-muted-foreground" />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold">
                        Permission policies are not available yet
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Your merchant account is connected, but the
                        permission-policy read and mutation operations
                        have not yet been exposed through the merchant
                        SDK/API.
                    </p>

                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                        No policy records are being fabricated in the dashboard.
                        Once the backend contract and SDK methods are available,
                        this page will begin rendering the canonical records.
                    </p>

                    <Button
                        render={
                            <Link href="/dashboard/platform/billing-operators">
                                View billing operators
                            </Link>
                        }
                        variant="outline"
                        className="mt-5"
                    />

                </div>

            </CardContent>
        </Card>
    );
}

////////////////////////////////////////////////////////////
// EMPTY
////////////////////////////////////////////////////////////

export function PermissionsEmptyState() {
    return (
        <Card>
            <CardContent className="p-8 text-center">

                <h2 className="text-lg font-semibold">
                    No permission policies found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    No policies match the current search and filters.
                </p>

            </CardContent>
        </Card>
    );
}