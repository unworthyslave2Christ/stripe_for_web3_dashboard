import {
    CheckCircle2,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const capabilities = [
    {
        title: "Recurring billing",
        description:
            "Your active subscriptions can be charged according to their plans.",
        icon: CreditCard,
        enabled: true,
    },
    {
        title: "Billing authorization",
        description:
            "Your Smart Account has an active permission for subscription billing.",
        icon: ShieldCheck,
        enabled: true,
    },
    {
        title: "Account management",
        description:
            "You can inspect and manage your Smart Account through this portal.",
        icon: CheckCircle2,
        enabled: true,
    },
];

export function SmartAccountCapabilities() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Account capabilities
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {capabilities.map((capability) => {
                    const Icon =
                        capability.icon;

                    return (
                        <div
                            key={
                                capability.title
                            }
                            className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
                        >

                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">

                                <Icon className="size-4 text-muted-foreground" />

                            </div>

                            <div className="flex-1">

                                <div className="flex items-center justify-between gap-3">

                                    <p className="text-sm font-medium">
                                        {capability.title}
                                    </p>

                                    {capability.enabled && (
                                        <Badge variant="secondary">
                                            Enabled
                                        </Badge>
                                    )}

                                </div>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    {capability.description}
                                </p>

                            </div>

                        </div>
                    );
                })}

            </CardContent>

        </Card>
    );
}