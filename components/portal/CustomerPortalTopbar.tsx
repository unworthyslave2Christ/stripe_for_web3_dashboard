"use client";

import {
    Menu,
    ShieldCheck,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    CustomerPortalWalletButton,
} from "./CustomerPortalWalletButton";

export function CustomerPortalTopbar({
    onOpenMobileNav,
}: {
    onOpenMobileNav:
        () => void;
}) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-6">

            <div className="flex items-center gap-3">

                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open navigation"
                    onClick={
                        onOpenMobileNav
                    }
                >
                    <Menu />
                </Button>

                <div className="hidden items-center gap-2 sm:flex">

                    <ShieldCheck className="size-4 text-muted-foreground" />

                    <Badge variant="secondary">
                        Smart Account
                    </Badge>

                </div>

            </div>

            <CustomerPortalWalletButton />

        </header>
    );
}