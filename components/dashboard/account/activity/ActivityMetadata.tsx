export function ActivityMetadata({
    metadata,
}: {
    metadata: Record<string, string>;
}) {
    const entries =
        Object.entries(metadata);

    if (entries.length === 0) {
        return (
            <span className="text-xs text-muted-foreground">
                —
            </span>
        );
    }

    return (
        <div className="space-y-1">

            {entries
                .slice(0, 2)
                .map(([key, value]) => (
                    <p
                        key={key}
                        className="max-w-[220px] truncate font-mono text-[10px] text-muted-foreground"
                    >
                        {key}: {value}
                    </p>
                ))}

            {entries.length > 2 && (
                <p className="text-[10px] text-muted-foreground">
                    +{entries.length - 2} more
                </p>
            )}

        </div>
    );
}