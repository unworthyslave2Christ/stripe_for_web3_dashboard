"use client";

import {
    Bell,
    Menu,
    Search,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

import {
    EnvironmentBadge,
} from "./EnvironmentBadge";

export function DashboardTopbar() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur lg:px-6">

            <Button
                variant="ghost"
                size="icon"
                className="mr-3 lg:hidden"
            >
                <Menu />
            </Button>

            <div className="hidden flex-1 md:block">
                <Button
                    variant="outline"
                    className="h-9 w-full max-w-sm justify-start gap-2 text-muted-foreground"
                >
                    <Search className="size-4" />

                    <span>
                        Search...
                    </span>

                    <kbd className="ml-auto rounded border bg-muted px-1.5 text-[10px]">
                        ⌘ K
                    </kbd>
                </Button>
            </div>

            <div className="ml-auto flex items-center gap-2">

                <EnvironmentBadge />

                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                >
                    <Bell />

                    <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
                </Button>

                <Badge variant="outline">
                    Test mode
                </Badge>

            </div>

        </header>
    );
}