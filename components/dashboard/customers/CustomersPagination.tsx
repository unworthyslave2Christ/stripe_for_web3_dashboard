import {
    Button,
} from "@/components/ui/button";

////////////////////////////////////////////////////////////
// PAGINATION
////////////////////////////////////////////////////////////

export function CustomersPagination() {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing 1–25 of 2,431 customers
            </p>

            <div className="flex gap-2">

                <Button
                    variant="outline"
                    size="sm"
                    disabled
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                >
                    Next
                </Button>

            </div>

        </div>
    );
}