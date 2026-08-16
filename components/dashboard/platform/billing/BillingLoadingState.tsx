import {
    Skeleton,
} from "@/components/ui/skeleton";

export function BillingLoadingState() {
    return (
        <div className="space-y-3">

            {Array.from({
                length: 6,
            }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4"
                >

                    <Skeleton className="size-9 rounded-lg" />

                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                    </div>

                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-24" />

                </div>
            ))}

        </div>
    );
}