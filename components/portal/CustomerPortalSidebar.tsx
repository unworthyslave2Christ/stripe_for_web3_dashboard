"use client";

import Link from "next/link";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Separator,
} from "@/components/ui/separator";

import {
    CustomerPortalNavigation,
} from "./CustomerPortalNavigation";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

import {
    Button,
} from "@/components/ui/button";
import { LogOut } from "lucide-react";

function getInitials(
    name?: string,
) {
    if (!name) {
        return "CU";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            (part) =>
                part[0]
                    ?.toUpperCase() ?? "",
        )
        .join("");
}

export function CustomerPortalSidebar() {
    const {
        customer,
    } = useCustomer();

    const displayName =
        customer?.displayName ??
        "Customer";

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r bg-card lg:flex lg:flex-col">

            {/* BRAND */}

            <div className="flex h-16 items-center px-5">

                <Link
                    href="/portal"
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

            {/* CUSTOMER */}

            <div className="p-3">

                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">

                    <Avatar className="size-8">

                        <AvatarFallback>
                            {getInitials(
                                displayName,
                            )}
                        </AvatarFallback>

                    </Avatar>

                    <div className="min-w-0">

                        <p className="truncate text-sm font-medium">
                            {displayName}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            Customer portal
                        </p>

                    </div>

                </div>

            </div>

            {/* NAVIGATION */}

            <div className="flex-1 overflow-y-auto px-3">
                <CustomerPortalNavigation />
            </div>

            {/* FOOTER */}

            <Separator />

            <div className="flex items-center gap-3 rounded-lg p-2">

                <div className="p-3">

                    <p className="px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                        Powered by
                    </p>

                    <p className="mt-1 px-2 text-sm font-medium">
                        Stripe for Web3
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

        </aside>
    );
}
