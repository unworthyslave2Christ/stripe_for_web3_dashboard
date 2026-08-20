import {
    AlertTriangle,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerPermissionGuidance() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    About Smart Account permissions
                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <GuidanceItem
                        icon={
                            ShieldCheck
                        }
                        title="Explicit authorization"
                        description="Permissions define what a Smart Account authorization may be used for."
                    />

                    <GuidanceItem
                        icon={
                            CheckCircle2
                        }
                        title="Active subscriptions"
                        description="Your active subscriptions may depend on an active billing authorization."
                    />

                    <GuidanceItem
                        icon={
                            AlertTriangle
                        }
                        title="Revocation has consequences"
                        description="Revoking billing authorization may prevent future recurring charges from completing."
                    />

                </div>

            </CardContent>

        </Card>
    );
}

function GuidanceItem({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof ShieldCheck;

    title: string;

    description: string;
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-4">

            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">

                <Icon className="size-4" />

            </div>

            <p className="mt-3 text-sm font-medium">
                {title}
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {description}
            </p>

        </div>
    );
}