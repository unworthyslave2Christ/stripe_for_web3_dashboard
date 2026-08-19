import Link from "next/link";

import {
    CreditCard,
    Plus,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

export function CustomerSubscriptionsHeader({
    hasCustomer,
}: {
    hasCustomer: boolean;
}) {
    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div>

                <div className="flex items-center gap-2">

                    <p className="text-sm font-medium text-muted-foreground">
                        Customer portal
                    </p>

                    <Badge variant="secondary">
                        <CreditCard />
                        Smart Account
                    </Badge>

                </div>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    My subscriptions
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    View and manage the subscriptions associated with your Smart Account.
                </p>

            </div>

            <Button
                render={
                    <Link href="/portal">
                        <Plus />
                        Browse plans
                    </Link>
                }
                disabled={!hasCustomer}
            />

        </div>
    );
}