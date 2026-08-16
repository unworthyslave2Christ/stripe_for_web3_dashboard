import {
    Users,
} from "lucide-react";

export function CustomerDetailEmptyState() {
    return (
        <div className="flex min-h-[400px] items-center justify-center">

            <div className="max-w-md text-center">

                <div className="mx-auto flex size-12 items-center justify-center rounded-full border bg-muted/30">

                    <Users className="size-5 text-muted-foreground" />

                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Customer not found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    The customer you're looking for does not exist or is
                    no longer available.
                </p>

            </div>

        </div>
    );
}