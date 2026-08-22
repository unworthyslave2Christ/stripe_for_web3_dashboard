import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    BillingRecord,
} from "./billing.types";

import {
    BillingTableRow,
} from "./BillingTableRow";

export function BillingTable({
    records,
}: {
    records: BillingRecord[];
}) {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                {records.length === 0 ? (
                    <div className="flex min-h-[220px] items-center justify-center border-b border-dashed p-8 text-center">

                        <div>

                            <p className="text-sm font-medium">
                                No billing events available
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Billing event retrieval is not yet
                                exposed through the merchant SDK.
                            </p>

                        </div>

                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1100px]">

                            <thead>
                                <tr className="border-b bg-muted/30">

                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                        Billing event
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                        Customer
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                        Subscription
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                        Amount
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                        Processed
                                    </th>

                                    <th className="px-4 py-3" />

                                </tr>
                            </thead>

                            <tbody>
                                {records.map(
                                    (billing) => (
                                        <BillingTableRow
                                            key={
                                                billing.id
                                            }
                                            billing={
                                                billing
                                            }
                                        />
                                    ),
                                )}
                            </tbody>

                        </table>

                    </div>
                )}

            </CardContent>

        </Card>
    );
}