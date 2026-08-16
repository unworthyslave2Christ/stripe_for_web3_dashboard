import Link from "next/link";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import type {
    SubscriptionRecord,
} from "./subscription.types";

export function SubscriptionCustomer({
    subscription,
}: {
    subscription: SubscriptionRecord;
}) {
    const initials = subscription.customerName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="flex items-center gap-3">

            <Avatar className="size-8">
                <AvatarFallback>
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/customers/${subscription.customerId}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {subscription.customerName}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {subscription.customerId}
                </p>

            </div>

        </div>
    );
}