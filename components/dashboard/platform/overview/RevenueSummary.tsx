import {
    Card,
} from "@/components/ui/card";

export function RevenueSummary({
    recurringRevenue,
    oneTimeRevenue,
    refunds,
    demo,
}: {
    recurringRevenue:
        number;

    oneTimeRevenue:
        number;

    refunds:
        number;

    demo:
        boolean;
}) {
    const total =
        recurringRevenue +
        oneTimeRevenue -
        refunds;

    return (
        <Card className="flex flex-col justify-between p-6">

            <div>

                <p className="text-sm font-medium text-muted-foreground">
                    Revenue this month
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight">
                    $
                    {total.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        },
                    )}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">

                    {demo
                        ? "Test-mode revenue facade."
                        : "Live billing revenue is not yet exposed by the merchant SDK."}

                </p>

            </div>

            <div className="mt-8 space-y-4">

                <MetricRow
                    label="Recurring revenue"
                    value={
                        recurringRevenue
                    }
                    demo={
                        demo
                    }
                />

                <MetricRow
                    label="One-time revenue"
                    value={
                        oneTimeRevenue
                    }
                    demo={
                        demo
                    }
                />

                <MetricRow
                    label="Refunds"
                    value={
                        refunds
                    }
                    demo={
                        demo
                    }
                />

            </div>

        </Card>
    );
}

function MetricRow({
    label,
    value,
}: {
    label:
        string;

    value:
        number;

    demo:
        boolean;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-medium">
                $
                {value.toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    },
                )}
            </span>

        </div>
    );
}