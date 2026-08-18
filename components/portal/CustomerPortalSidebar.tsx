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

export function CustomerPortalSidebar() {
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
                            AJ
                        </AvatarFallback>

                    </Avatar>

                    <div className="min-w-0">

                        <p className="truncate text-sm font-medium">
                            Alex Johnson
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            Customer portal
                        </p>

                    </div>

                </div>

            </div>

            <div className="flex-1 overflow-y-auto px-3">

                <CustomerPortalNavigation />

            </div>

            <Separator />

            <div className="p-3">

                <p className="px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Powered by
                </p>

                <p className="mt-1 px-2 text-sm font-medium">
                    Stripe for Web3
                </p>

            </div>

        </aside>
    );
}