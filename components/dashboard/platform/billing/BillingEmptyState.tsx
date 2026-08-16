import {
    ReceiptText,
} from "lucide-react";

export function BillingEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <ReceiptText className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-base font-semibold">
                No billing events yet
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Billing events will appear here once your customers begin generating recurring charges.
            </p>

        </div>
    );
}