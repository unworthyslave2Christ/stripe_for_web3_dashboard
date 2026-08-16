import {
    ShieldCheck,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function BillingOperatorsEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <ShieldCheck className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-base font-semibold">
                No billing operators
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Add an operator when you need a service or administrator to interact with your billing infrastructure.
            </p>

            <Button className="mt-5">
                Add operator
            </Button>

        </div>
    );
}