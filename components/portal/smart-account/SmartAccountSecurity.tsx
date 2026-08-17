import {
    AlertTriangle,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SmartAccountSecurity() {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="size-4" />
                    Security
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                <SecurityItem
                    icon={LockKeyhole}
                    title="Owner wallet controls the account"
                    description="Your connected wallet remains the owner of the Smart Account."
                />

                <SecurityItem
                    icon={ShieldCheck}
                    title="Billing uses explicit authorization"
                    description="Recurring billing operates through the configured Smart Account permission."
                />

                <div className="flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">

                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />

                    <div>

                        <p className="text-sm font-medium">
                            Protect your connected wallet
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Anyone controlling the owner wallet may be able
                            to control the Smart Account. Never share wallet credentials.
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}

function SecurityItem({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof ShieldCheck;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">

            <Icon className="mt-0.5 size-4 text-muted-foreground" />

            <div>

                <p className="text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}