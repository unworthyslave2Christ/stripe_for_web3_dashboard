import {
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

export function WebhookHealth({
    successfulDeliveries,
    failedDeliveries,
}: {
    successfulDeliveries: number;
    failedDeliveries: number;
}) {
    const total =
        successfulDeliveries +
        failedDeliveries;

    const successRate =
        total === 0
            ? 100
            : Math.round(
                  (successfulDeliveries /
                      total) *
                      1000,
              ) / 10;

    const healthy =
        successRate >= 98;

    return (
        <div className="flex items-center gap-2">

            {healthy ? (
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
            )}

            <div>

                <p className="text-sm font-medium">
                    {successRate}%
                </p>

                <p className="text-xs text-muted-foreground">
                    delivery success
                </p>

            </div>

        </div>
    );
}