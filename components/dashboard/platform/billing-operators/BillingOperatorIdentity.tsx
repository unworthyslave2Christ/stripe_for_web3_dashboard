import Link from "next/link";

import {
    ShieldCheck,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import type {
    BillingOperatorRecord,
} from "./billing-operator.types";

export function BillingOperatorIdentity({
    operator,
}: {
    operator: BillingOperatorRecord;
}) {
    const initials =
        operator.name
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

            <Avatar className="size-9">
                <AvatarFallback>
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/platform/billing-operators/${operator.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {operator.name}
                </Link>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">

                    <ShieldCheck className="size-3 shrink-0" />

                    <span className="truncate">
                        {operator.operatorId}
                    </span>

                </div>

            </div>

        </div>
    );
}