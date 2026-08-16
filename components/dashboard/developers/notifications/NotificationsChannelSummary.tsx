import {
    Mail,
    Monitor,
    Webhook,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function NotificationsChannelSummary() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Channels
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

                <ChannelRow
                    icon={Mail}
                    label="Email"
                    count="8,421"
                    percentage="45.7%"
                />

                <ChannelRow
                    icon={Webhook}
                    label="Webhook"
                    count="6,842"
                    percentage="37.2%"
                />

                <ChannelRow
                    icon={Monitor}
                    label="In-app"
                    count="3,158"
                    percentage="17.1%"
                />

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="text-xs text-muted-foreground">
                        Total notifications
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                        18,421
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}

function ChannelRow({
    icon: Icon,
    label,
    count,
    percentage,
}: {
    icon: typeof Mail;
    label: string;
    count: string;
    percentage: string;
}) {
    return (
        <div className="flex items-center gap-3">

            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" />
            </div>

            <div className="flex-1">

                <p className="text-sm font-medium">
                    {label}
                </p>

                <p className="text-xs text-muted-foreground">
                    {count} sent
                </p>

            </div>

            <p className="text-sm font-medium">
                {percentage}
            </p>

        </div>
    );
}