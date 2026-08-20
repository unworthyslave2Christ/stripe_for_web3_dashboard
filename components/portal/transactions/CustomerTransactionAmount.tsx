export function CustomerTransactionAmount({
    amount,
    currency,
}: {
    amount:
        | string
        | null;

    currency:
        | string
        | null;
}) {
    if (
        !amount ||
        !currency
    ) {
        return (
            <span className="text-sm text-muted-foreground">
                No asset amount
            </span>
        );
    }

    return (
        <div>

            <p className="text-sm font-semibold">
                {currency} {amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                Transaction value
            </p>

        </div>
    );
}