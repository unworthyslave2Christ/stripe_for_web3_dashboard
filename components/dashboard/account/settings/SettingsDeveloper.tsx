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

export function SettingsDeveloper() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Developer configuration
                </CardTitle>

                <CardDescription>
                    Manage integration defaults without exposing credentials.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

                <DeveloperLink
                    title="API keys"
                    description="Create, revoke, and manage merchant API credentials."
                    href="/dashboard/developers"
                />

                <DeveloperLink
                    title="Webhooks"
                    description="Configure event delivery endpoints and signing secrets."
                    href="/dashboard/webhooks"
                />

            </CardContent>

        </Card>
    );
}

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
                    <a href={href}>
                        Open
                        <ExternalLink />
                    </a>
                }
                variant="outline"
                size="sm"
            />


        </div>
    );
}