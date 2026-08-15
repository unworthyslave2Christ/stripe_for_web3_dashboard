import {
    Skeleton,
} from "@/components/ui/skeleton";

export function SubscriptionDetailLoadingState() {
    return (
        <div className="space-y-6">

            <Skeleton className="h-5 w-36" />

            <div className="rounded-xl border p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="size-12 rounded-xl" />

                    <div className="space-y-2">
                        <Skeleton className="h-6 w-56" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-32"
                    />
                ))}
            </div>

        </div>
    );
}