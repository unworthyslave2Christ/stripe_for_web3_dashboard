import Link from "next/link";

import {
    ExternalLink,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function DeveloperLink({
    title,
    description,
    href,
}: {
    title: string;
    description: string;
    href: string;
}) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>

            <Button
                render={
                    <Link href={href}>
                        Open
                        <ExternalLink />
                    </Link>
                }
                variant="outline"
                size="sm"
            />
        </div>
    );
}

export function SettingsDeveloper() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Developer configuration
                </CardTitle>

                <CardDescription>
                    Manage integration resources
                    without exposing credentials.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <DeveloperLink
                    title="API keys"
                    description="Create, revoke, and manage merchant API credentials."
                    href="/dashboard/developers/api-keys"
                />

                <DeveloperLink
                    title="Webhooks"
                    description="Configure event delivery endpoints and signing secrets."
                    href="/dashboard/developers/webhooks"
                />

                <DeveloperLink
                    title="Notifications"
                    description="Configure notification policies and delivery behavior."
                    href="/dashboard/developers/notifications"
                />
            </CardContent>
        </Card>
    );
}