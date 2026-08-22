import {
    AlertTriangle,
    ArrowRight,
} from "lucide-react";

import Link from "next/link";

import {
    Button,
} from "@/components/ui/button";

export function BillingOperatorsUnavailableState() {
    return (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <AlertTriangle className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Billing operators are not connected yet
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                Your merchant account is available, but the
                billing-operator resource has not yet been exposed
                through the merchant SDK/API.
            </p>

            <p className="mt-2 max-w-lg text-xs leading-5 text-muted-foreground">
                This page is intentionally ready for the real
                operator resource without inventing authorization
                state or operator records.
            </p>

            <Button
                render={
                    <Link href="/dashboard/platform/permissions">
                        Review permissions
                        <ArrowRight />
                    </Link>
                }
                className="mt-5"
            />
        </div>
    );
}