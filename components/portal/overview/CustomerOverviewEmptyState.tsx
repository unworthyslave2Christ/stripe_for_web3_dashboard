import Link from "next/link";

import {
    ArrowRight,
    WalletCards,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerOverviewEmptyState() {
    return (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <WalletCards className="size-5 text-muted-foreground" />

            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Your customer account isn't ready yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Complete customer onboarding to create or recover your Smart Account and access the customer portal.
            </p>

            <Button
                render={
                    <Link href="/customer/onboarding">
                        Complete onboarding
                        <ArrowRight />
                    </Link>
                }
                className="mt-5"
            />

        </div>
    );
}