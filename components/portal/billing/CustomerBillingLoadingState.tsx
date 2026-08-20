import {
    Skeleton,
} from "@/components/ui/skeleton";

export function CustomerBillingLoadingState() {
    return (
        <div className="space-y-8">

            <div className="space-y-3">

                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-9 w-40" />

                <Skeleton className="h-4 w-[560px] max-w-full" />

            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({
                    length: 4,
                }).map(
                    (
                        _,
                        index,
                    ) => (
                        <div
                            key={
                                index
                            }
                            className="rounded-xl border bg-card p-5"
                        >
                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="mt-4 h-8 w-24" />

                            <Skeleton className="mt-4 h-3 w-32" />
                        </div>
                    ),
                )}

            </div>

            <div className="rounded-xl border bg-card p-5">

                <Skeleton className="h-5 w-40" />

                <Skeleton className="mt-6 h-28 w-full" />

            </div>

            {Array.from({
                length: 3,
            }).map(
                (
                    _,
                    index,
                ) => (
                    <div
                        key={
                            index
                        }
                        className="rounded-xl border bg-card p-5"
                    >
                        <Skeleton className="h-16 w-full" />
                    </div>
                ),
            )}

        </div>
    );
}