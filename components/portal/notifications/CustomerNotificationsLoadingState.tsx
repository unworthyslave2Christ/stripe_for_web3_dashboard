import {
    Skeleton,
} from "@/components/ui/skeleton";

export function CustomerNotificationsLoadingState() {
    return (
        <div className="space-y-3">

            {Array.from({
                length: 4,
            }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl border bg-card p-5"
                >

                    <div className="flex items-start gap-4">

                        <Skeleton className="size-10 rounded-lg" />

                        <div className="flex-1 space-y-2">

                            <Skeleton className="h-4 w-52" />

                            <Skeleton className="h-3 w-80" />

                            <Skeleton className="h-3 w-24" />

                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
}