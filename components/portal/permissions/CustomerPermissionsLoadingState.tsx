import {
    Skeleton,
} from "@/components/ui/skeleton";

export function CustomerPermissionsLoadingState() {
    return (
        <div className="space-y-8">

            <div className="space-y-3">

                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-9 w-48" />

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
                            key={index}
                            className="rounded-xl border bg-card p-5"
                        >
                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="mt-4 h-8 w-16" />

                            <Skeleton className="mt-4 h-3 w-32" />
                        </div>
                    ),
                )}

            </div>

            <Skeleton className="h-44 w-full rounded-xl" />

            <div className="space-y-3">

                {Array.from({
                    length: 2,
                }).map(
                    (
                        _,
                        index,
                    ) => (
                        <Skeleton
                            key={index}
                            className="h-28 w-full rounded-xl"
                        />
                    ),
                )}

            </div>

        </div>
    );
}