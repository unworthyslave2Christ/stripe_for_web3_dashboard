import Link from "next/link";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import type {
    BillingRecord,
} from "./billing.types";

export function BillingCustomer({
    billing,
}: {
    billing: BillingRecord;
}) {
    const initials =
        billing.customerName
            .split(" ")
            .map(
                (part) =>
                    part[0],
            )
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
                    href={`/dashboard/platform/customers/${billing.customerId}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {billing.customerName}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {billing.customerId}
                </p>

            </div>

        </div>
    );
}