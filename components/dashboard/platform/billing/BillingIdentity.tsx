import Link from "next/link";

import {
    ReceiptText,
} from "lucide-react";

import type {
    BillingRecord,
} from "./billing.types";

export function BillingIdentity({
    billing,
}: {
    billing: BillingRecord;
}) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <ReceiptText className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/platform/billing/${billing.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {billing.billingId}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    Billing event
                </p>

            </div>

        </div>
    );
}