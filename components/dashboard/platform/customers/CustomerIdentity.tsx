"use client";

import Link from "next/link";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import type {
    CustomerRecord,
} from "./customer.types";

export function CustomerIdentity({
    customer,
}: {
    customer: CustomerRecord;
}) {
    const initials =
        customer.displayName!
            .split(/\s+/)
            .map(
                part => part[0] ?? "",
            )
            .join("")
            .slice(0, 2)
            .toUpperCase() || "CU";

    return (
        <div className="flex min-w-0 items-center gap-3">

            <Avatar className="size-9">
                <AvatarFallback>
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/platform/customers/${customer.customerId}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {customer.displayName}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {customer.customerId}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                    {customer.email}
                </p>

            </div>

        </div>
    );
}