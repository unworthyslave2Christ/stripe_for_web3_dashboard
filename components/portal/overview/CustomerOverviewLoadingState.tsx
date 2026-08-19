import {
    Skeleton,
} from "@/components/ui/skeleton";

export function CustomerOverviewLoadingState() {
    return (
        <div className="space-y-6">

            <div className="space-y-3">

                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-9 w-72" />

                <Skeleton className="h-4 w-[520px] max-w-full" />

            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({
                    length: 4,
                }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border bg-card p-5"
                        >
                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="mt-4 h-8 w-24" />

                            <Skeleton className="mt-4 h-3 w-32" />
                        </div>
                    ),
                )}

            </div>

            <div className="grid gap-4 lg:grid-cols-2">

                <div className="rounded-xl border bg-card p-5">
                    <Skeleton className="h-5 w-32" />

                    <Skeleton className="mt-6 h-[220px] w-full" />
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <Skeleton className="h-5 w-32" />

                    <Skeleton className="mt-6 h-32 w-full" />
                </div>

            </div>

        </div>
    );
}