export function BillingOperatorActivity({
    lastActivity,
}: {
    lastActivity: string;
}) {
    return (
        <div>
            <p className="text-sm">
                {lastActivity}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                Last activity
            </p>
        </div>
    );
}