import Link from "next/link";

import {
    Button,
} from "@/components/ui/button";

import {
    CreditCard,
} from "lucide-react";

export function CustomerSubscriptionsEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <CreditCard className="size-5 text-muted-foreground" />

            </div>

            <h3 className="mt-4 text-base font-semibold">
                No subscriptions yet
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                When you subscribe to a merchant plan, your subscription will appear here.
            </p>

            <Button
                render={
                    <Link href="/portal">
                        Return to overview
                    </Link>
                }
                className="mt-5"
            />

        </div>
    );
}