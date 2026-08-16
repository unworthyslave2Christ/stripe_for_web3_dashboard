import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerIdentityCard({
    customer,
}: {
    customer: {
        id: string;
        displayName: string;
        status: string;
        createdAt: string;
    };
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Identity
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <InfoRow
                    label="Customer"
                    value={customer.displayName}
                />

                <InfoRow
                    label="Customer ID"
                    value={customer.id}
                />

                <InfoRow
                    label="Status"
                    value={customer.status}
                />

                <InfoRow
                    label="Created"
                    value={customer.createdAt}
                />

            </CardContent>

        </Card>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="max-w-[60%] break-all text-right text-sm font-medium">
                {value}
            </span>

        </div>
    );
}