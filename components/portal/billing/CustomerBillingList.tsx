import type {
    CustomerBillingRecord,
} from "@/types/customer-billing";

import {
    CustomerBillingListItem,
} from "./CustomerBillingListItem";

export function CustomerBillingList({
    billing,
}: {
    billing:
        CustomerBillingRecord[];
}) {
    if (
        billing.length ===
        0
    ) {
        return (
            <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                <p className="text-sm font-medium">
                    No billing events found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or status filter.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-3">

            {billing.map(
                (
                    record,
                ) => (
                    <CustomerBillingListItem
                        key={
                            record.id
                        }
                        billing={
                            record
                        }
                    />
                ),
            )}

        </div>
    );
}