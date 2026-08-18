import Link from "next/link";

import {
    Bell,
    CreditCard,
    History,
    LockKeyhole,
    WalletCards,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const actions = [
    {
        label: "Manage Smart Account",
        href: "/portal/smart-account",
        icon: WalletCards,
    },
    {
        label: "Manage subscriptions",
        href: "/portal/subscriptions",
        icon: CreditCard,
    },
    {
        label: "View transactions",
        href: "/portal/transactions",
        icon: History,
    },
    {
        label: "Manage permissions",
        href: "/portal/permissions",
        icon: LockKeyhole,
    },
    {
        label: "Notifications",
        href: "/portal/notifications",
        icon: Bell,
    },
];

export function CustomerQuickActions() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Quick actions
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                    {actions.map((action) => {
                        const Icon =
                            action.icon;

                        return (
                            <Link
                                key={action.href}
                                href={action.href}
                                className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/30"
                            >
                                <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                                    <Icon className="size-4" />
                                </div>

                                <span className="font-medium">
                                    {action.label}
                                </span>
                            </Link>
                        );
                    })}

                </div>

            </CardContent>

        </Card>
    );
}