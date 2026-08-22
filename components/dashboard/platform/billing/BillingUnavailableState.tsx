import {
    AlertTriangle,
    ArrowRight,
} from "lucide-react";

import Link from "next/link";

import {
    Button,
} from "@/components/ui/button";

export function BillingUnavailableState() {
    return (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <AlertTriangle className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Billing data is not connected yet
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                The merchant account is available, but billing
                collection and reconciliation operations have not
                yet been exposed through the merchant SDK/API.
            </p>

            <p className="mt-2 max-w-lg text-xs leading-5 text-muted-foreground">
                The billing UI is ready for the real operations.
                Once the SDK exposes the billing resources, this
                page can consume them without changing the page
                structure.
            </p>

            <Button
                render={
                    <Link href="/dashboard/platform/subscriptions">
                        Review subscriptions
                        <ArrowRight />
                    </Link>
                }
                className="mt-5"
            />
        </div>
    );
}