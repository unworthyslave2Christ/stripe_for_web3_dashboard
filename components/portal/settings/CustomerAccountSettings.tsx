"use client";

import {
    LogOut,
    UserRound,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerAccountSettings() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Account
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Manage your customer portal session and account-level access.
                </p>

            </CardHeader>

            <CardContent className="space-y-4">

                <AccountAction
                    icon={UserRound}
                    title="Customer profile"
                    description="Your customer record is associated with your connected wallet."
                >
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        View profile
                    </Button>
                </AccountAction>

                <AccountAction
                    icon={LogOut}
                    title="Sign out"
                    description="Disconnect this customer portal session from the current account."
                >
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        <LogOut />
                        Sign out
                    </Button>
                </AccountAction>

            </CardContent>

        </Card>
    );
}

function AccountAction({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: typeof UserRound;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex gap-3">

                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                </div>

                <div>

                    <p className="text-sm font-medium">
                        {title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {description}
                    </p>

                </div>

            </div>

            {children}

        </div>
    );
}