import Link from "next/link";

import {
    ArrowRight,
    CreditCard,
    ShieldCheck,
    WalletCards,
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

export function CustomerQuickActions() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Quick actions
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">

                <Action
                    href="/portal/subscriptions"
                    icon={CreditCard}
                    label="Manage subscriptions"
                />

                <Action
                    href="/portal/smart-account"
                    icon={WalletCards}
                    label="View Smart Account"
                />

                <Action
                    href="/portal/permissions"
                    icon={ShieldCheck}
                    label="Review permissions"
                />

            </CardContent>

        </Card>
    );
}

function Action({
    href,
    icon: Icon,
    label,
}: {
    href: string;

    icon: typeof CreditCard;

    label: string;
}) {
    return (
        <Button
            render={
                <Link href={href}>

                    <span className="flex items-center gap-2">

                        <Icon className="size-4" />

                        {label}

                    </span>

                    <ArrowRight />

                </Link>
            }
            variant="outline"
            className="h-auto w-full justify-between px-3 py-3"
        />
    );
}