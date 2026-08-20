import type {
    CustomerTransactionRecord,
} from "@/types/customer-transaction";

import {
    CustomerTransactionListItem,
} from "./CustomerTransactionListItem";

export function CustomerTransactionsList({
    transactions,
}: {
    transactions:
        CustomerTransactionRecord[];
}) {
    if (
        transactions.length === 0
    ) {
        return (
            <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                <p className="text-sm font-medium">
                    No transactions found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or transaction filters.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-3">

            {transactions.map(
                (
                    transaction,
                ) => (
                    <CustomerTransactionListItem
                        key={
                            transaction.id
                        }
                        transaction={
                            transaction
                        }
                    />
                ),
            )}

        </div>
    );
}