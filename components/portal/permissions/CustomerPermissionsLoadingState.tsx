import {
    Skeleton,
} from "@/components/ui/skeleton";

export function CustomerPermissionsLoadingState() {
    return (
        <div className="space-y-3">

            {Array.from({
                length: 3,
            }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl border bg-card p-5"
                >

                    <div className="flex items-center gap-4">

                        <Skeleton className="size-10 rounded-lg" />

                        <div className="flex-1 space-y-2">

                            <Skeleton className="h-4 w-48" />

                            <Skeleton className="h-3 w-72" />

                        </div>

                        <Skeleton className="h-7 w-20" />

                    </div>

                </div>
            ))}

        </div>
    );
}