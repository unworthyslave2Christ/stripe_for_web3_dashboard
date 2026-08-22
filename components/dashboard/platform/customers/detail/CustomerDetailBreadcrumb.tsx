"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CustomerDetailBreadcrumb({
    customerId,
}: {
    customerId: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
        >
            <Link
                href="/dashboard/platform/customers"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Customers
            </Link>

            <ChevronRight className="size-4 text-muted-foreground" />

            <span className="font-medium">
                {customerId}
            </span>
        </nav>
    );
}