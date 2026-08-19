import {
    CheckCircle2,
    CreditCard,
    ShieldCheck,
    WalletCards,
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

export function SmartAccountCapabilities({
    hasSmartAccount,
    billingAuthorization,
    demo,
}: {
    hasSmartAccount: boolean;

    billingAuthorization:
        | "ACTIVE"
        | "PAUSED"
        | "REVOKED"
        | "UNKNOWN";

    demo: boolean;
}) {
    const capabilities = [
        {
            title:
                "Recurring billing",

            description:
                "Your active subscriptions can be charged according to their plans.",

            icon:
                CreditCard,

            enabled:
                hasSmartAccount,
        },

        {
            title:
                "Billing authorization",

            description:
                "Recurring billing requires explicit Smart Account authorization.",

            icon:
                ShieldCheck,

            enabled:
                billingAuthorization ===
                "ACTIVE",
        },

        {
            title:
                "Account management",

            description:
                "You can inspect and manage your Smart Account through this portal.",

            icon:
                WalletCards,

            enabled:
                hasSmartAccount,
        },
    ];

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Account capabilities
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                {capabilities.map(
                    (capability) => {

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
                                            {
                                                capability.title
                                            }
                                        </p>

                                        {capability.enabled && (
                                            <Badge variant="secondary">
                                                Enabled
                                            </Badge>
                                        )}

                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        {
                                            capability.description
                                        }
                                    </p>

                                </div>

                            </div>
                        );
                    },
                )}

                {demo && (
                    <p className="pt-1 text-xs text-muted-foreground">
                        Capability status is partially represented using test-mode data.
                    </p>
                )}

            </CardContent>

        </Card>
    );
}