import Link from "next/link";

import {
    CreditCard,
    Plus,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerSubscriptionsEmptyState() {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <CreditCard className="size-5 text-muted-foreground" />

            </div>

            <h2 className="mt-4 text-lg font-semibold">
                No subscriptions yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Browse the plans available to your Smart Account and choose the subscriptions you want to manage here.
            </p>

            <Button
                render={
                    <Link href="/portal">
                        <Plus />
                        Browse plans
                    </Link>
                }
                className="mt-5"
            />

        </div>
    );
}