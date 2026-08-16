import {
    Skeleton,
} from "@/components/ui/skeleton";

export function ActivityLoadingState() {
    return (
        <div className="space-y-3">

            {Array.from({
                length: 7,
            }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-start gap-4 rounded-xl border bg-card p-4"
                >

                    <Skeleton className="size-8 rounded-full" />

                    <div className="flex-1 space-y-2">

                        <Skeleton className="h-4 w-56" />

                        <Skeleton className="h-3 w-80" />

                        <Skeleton className="h-3 w-40" />

                    </div>

                </div>
            ))}

        </div>
    );
}