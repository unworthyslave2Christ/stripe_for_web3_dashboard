"use client";

import Link from "next/link";

import {
    X,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    CustomerPortalNavigation,
} from "./CustomerPortalNavigation";

export function CustomerPortalMobileNav({
    open,
    onClose,
}: {
    open: boolean;

    onClose:
        () => void;
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 lg:hidden">

            <div
                className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                onClick={
                    onClose
                }
            />

            <aside className="absolute inset-y-0 left-0 w-72 border-r bg-card p-4 shadow-xl">

                <div className="flex items-center justify-between">

                    <Link
                        href="/portal"
                        className="flex items-center gap-2"
                        onClick={
                            onClose
                        }
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

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={
                            onClose
                        }
                        aria-label="Close navigation"
                    >
                        <X />
                    </Button>

                </div>

                <div className="mt-6">
                    <CustomerPortalNavigation />
                </div>

            </aside>

        </div>
    );
}