import Link from "next/link";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import type { CustomerRecord } from "./customer.types";

type CustomerIdentityProps = {
    customer: CustomerRecord;
};

export function CustomerIdentity({
    customer,
}: CustomerIdentityProps) {
    const initials = customer.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-9">
                <AvatarFallback>
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
                <Link
                    href={`/dashboard/platform/customers/${customer.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {customer.name}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {customer.customerId}
                </p>
            </div>
        </div>
    );
}