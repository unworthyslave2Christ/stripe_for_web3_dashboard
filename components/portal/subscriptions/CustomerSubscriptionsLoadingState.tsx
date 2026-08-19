import {
    Skeleton,
} from "@/components/ui/skeleton";

export function CustomerSubscriptionsLoadingState() {
    return (
        <div className="space-y-8">

            <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-4 w-[520px] max-w-full" />
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
                            key={index}
                            className="rounded-xl border bg-card p-5"
                        >
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="mt-4 h-8 w-20" />
                            <Skeleton className="mt-4 h-3 w-24" />
                        </div>
                    ),
                )}

            </div>

            {Array.from({
                length: 3,
            }).map(
                (
                    _,
                    index,
                ) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-card p-5"
                    >
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="mt-5 h-16 w-full" />
                    </div>
                ),
            )}

        </div>
    );
}