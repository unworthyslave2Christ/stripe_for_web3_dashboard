"use client";

import Link from "next/link";

import {
    ChevronDown,
    CircleHelp,
    LogOut,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Button,
} from "@/components/ui/button";

import {
    Separator,
} from "@/components/ui/separator";

import {
    MerchantSwitcher,
} from "./MerchantSwitcher";

import {
    mainNavigation,
    developerNavigation,
    secondaryNavigation,
} from "./navigation/navigation";

export function DashboardSidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-card lg:flex lg:flex-col">

            {/* BRAND */}

            <div className="flex h-16 items-center px-5">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <span className="text-sm font-bold">
                            S
                        </span>
                    </div>

                    <span className="font-semibold tracking-tight">
                        Stripe for Web3
                    </span>
                </Link>
            </div>

            <Separator />

            {/* MERCHANT */}

            <div className="p-3">
                <MerchantSwitcher />
            </div>

            {/* NAVIGATION */}

            <div className="flex-1 overflow-y-auto px-3">

                <nav className="space-y-6">

                    <NavigationGroup
                        label="Platform"
                        items={mainNavigation}
                    />

                    <NavigationGroup
                        label="Developers"
                        items={developerNavigation}
                    />

                    <NavigationGroup
                        label="Account"
                        items={secondaryNavigation}
                    />

                </nav>

            </div>

            <Separator />

            {/* USER */}

            <div className="p-3">

                <div className="flex items-center gap-3 rounded-lg p-2">

                    <Avatar className="size-8">
                        <AvatarFallback>
                            AF
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                            ACMEFLOW
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            Merchant account
                        </p>
                    </div>

                    <Button
                        render={
                            <Link
                                href={"/"}
                            >
                                <LogOut />  
                            
                            </Link>
                        }
                        variant="ghost"
                        size="icon"
                        className="size-8"
                    />

                </div>

            </div>

        </aside>
    );
}

function NavigationGroup({
    label,
    items,
}: {
    label: string;
    items: typeof mainNavigation;
}) {
    return (
        <div>

            <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {label}
            </p>

            <div className="space-y-1">

                {items.map((item) => {

                    const Icon = item.icon;

                    const active =
                        item.href === "/";

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                "flex h-9 items-center gap-3 rounded-md px-2.5 text-sm transition-colors",
                                active
                                    ? "bg-accent font-medium text-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            ].join(" ")}
                        >
                            <Icon className="size-4" />

                            <span>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

            </div>

        </div>
    );
}