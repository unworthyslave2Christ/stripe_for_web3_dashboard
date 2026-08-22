import {
    Button,
} from "@/components/ui/button";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    BillingIdentity,
} from "./BillingIdentity";

import {
    BillingCustomer,
} from "./BillingCustomer";

import {
    BillingSubscription,
} from "./BillingSubscription";

import {
    BillingAmount,
} from "./BillingAmount";

import {
    BillingDate,
} from "./BillingDate";

import {
    BillingStatusBadge,
} from "./BillingStatusBadge";

import type {
    BillingRecord,
} from "./billing.types";

export function BillingTableRow({
    billing,
}: {
    billing: BillingRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <BillingIdentity
                    billing={billing}
                />
            </td>

            <td className="px-4 py-4">
                <BillingCustomer
                    billing={billing}
                />
            </td>

            <td className="px-4 py-4">
                <BillingSubscription
                    billing={billing}
                />
            </td>

            <td className="px-4 py-4">
                <BillingAmount
                    billing={billing}
                />
            </td>

            <td className="px-4 py-4">
                <BillingStatusBadge
                    status={billing.status}
                />
            </td>

            <td className="px-4 py-4">
                <BillingDate
                    value={
                        billing.processedAt
                    }
                />
            </td>

            <td className="px-4 py-4 text-right">

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label="Billing event actions"
                >
                    <MoreHorizontal />
                </Button>

            </td>

        </tr>
    );
}