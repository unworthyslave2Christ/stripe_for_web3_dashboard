"use client";

import Link from "next/link";

import {
    Bell,
    Code2,
    CreditCard,
    Lock,
    Settings2,
    ShieldAlert,
} from "lucide-react";

const items = [
    {
        label: "General",
        href: "#general",
        icon: Settings2,
    },
    {
        label: "Billing",
        href: "#billing",
        icon: CreditCard,
    },
    {
        label: "Notifications",
        href: "#notifications",
        icon: Bell,
    },
    {
        label: "Developers",
        href: "#developers",
        icon: Code2,
    },
    {
        label: "Security",
        href: "#security",
        icon: Lock,
    },
    {
        label: "Danger zone",
        href: "#danger",
        icon: ShieldAlert,
    },
];

export function MerchantSettingsNavigation() {
    return (
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1">

            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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