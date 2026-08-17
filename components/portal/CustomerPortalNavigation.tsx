import {
    Bell,
    CreditCard,
    LayoutDashboard,
    LockKeyhole,
    Receipt,
    Settings,
    WalletCards,
    ArrowUpDown
} from "lucide-react";

import Link from "next/link";

const navigation = [
    {
        label: "Overview",
        href: "/portal",
        icon: LayoutDashboard,
    },
    {
        label: "Smart Account",
        href: "/portal/smart-account",
        icon: WalletCards,
    },
    {
        label: "Subscriptions",
        href: "/portal/subscriptions",
        icon: CreditCard,
    },
    {
        label: "Billing",
        href: "/portal/billing",
        icon: Receipt,
    },
    {
        label: "Permissions",
        href: "/portal/permissions",
        icon: LockKeyhole,
    },
    {
        label: "Transactions",
        href: "/portal/transactions",
        icon: ArrowUpDown,
    },
    {
        label: "Notifications",
        href: "/portal/notifications",
        icon: Bell,
    },
    {
        label: "Settings",
        href: "/portal/settings",
        icon: Settings,
    },
];

export function CustomerPortalNavigation() {
    return (
        <nav className="space-y-1">

            {navigation.map((item) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Icon className="size-4" />

                        <span>
                            {item.label}
                        </span>
                    </Link>
                );
            })}

        </nav>
    );
}