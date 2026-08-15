"use client";

import {
    ChevronsUpDown,
    Store,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    Button,
} from "@/components/ui/button";

export function MerchantSwitcher() {
    return (
        <Button
            variant="outline"
            className="h-auto w-full justify-between px-2.5 py-2"
        >
            <span className="flex min-w-0 items-center gap-2.5">

                <Avatar className="size-7 rounded-md">
                    <AvatarFallback className="rounded-md">
                        <Store className="size-3.5" />
                    </AvatarFallback>
                </Avatar>

                <span className="min-w-0 text-left">
                    <span className="block truncate text-sm font-medium">
                        ACMEFLOW
                    </span>

                    <span className="block truncate text-xs text-muted-foreground">
                        Merchant
                    </span>
                </span>

            </span>

            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
    );
}