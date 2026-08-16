import {
    AlertCircle,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerDetailErrorState() {
    return (
        <div className="flex min-h-[400px] items-center justify-center">

            <div className="max-w-md text-center">

                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">

                    <AlertCircle className="size-5" />

                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Unable to load customer
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    We could not retrieve this customer at the moment.
                    Please try again.
                </p>

                <Button
                    className="mt-5"
                    onClick={() =>
                        window.location.reload()
                    }
                >
                    Try again
                </Button>

            </div>

        </div>
    );
}