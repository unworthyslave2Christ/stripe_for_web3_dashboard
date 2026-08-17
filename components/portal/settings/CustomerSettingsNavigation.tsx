"use client";

import Link from "next/link";

import {
    Bell,
    LockKeyhole,
    Palette,
    Settings2,
    User,
    WalletCards,
} from "lucide-react";

const sections = [
    {
        label: "Profile",
        href: "#profile",
        icon: User,
    },
    {
        label: "Wallet & Smart Account",
        href: "#wallet",
        icon: WalletCards,
    },
    {
        label: "Notifications",
        href: "#notifications",
        icon: Bell,
    },
    {
        label: "Preferences",
        href: "#preferences",
        icon: Palette,
    },
    {
        label: "Security",
        href: "#security",
        icon: LockKeyhole,
    },
    {
        label: "Account",
        href: "#account",
        icon: Settings2,
    },
];

export function CustomerSettingsNavigation() {
    return (
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1">

            {sections.map((section) => {
                const Icon = section.icon;

                return (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Icon className="size-4" />

                        <span>
                            {section.label}
                        </span>
                    </Link>
                );
            })}

        </nav>
    );
}