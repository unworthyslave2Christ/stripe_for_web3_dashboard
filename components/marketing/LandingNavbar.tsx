"use client";

import Link from "next/link";

import {
    ArrowRight,
    Menu,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
    {
        label: "Product",
        href: "#product",
    },
    {
        label: "For merchants",
        href: "#merchants",
    },
    {
        label: "For customers",
        href: "#customers",
    },
    {
        label: "Developers",
        href: "#developers",
    },
    {
        label: "Security",
        href: "#security",
    },
];

export function LandingNavbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

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

                <nav className="hidden items-center gap-1 lg:flex">

                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="
                                relative rounded-md px-3 py-2 text-sm
                                text-muted-foreground
                                transition-colors
                                hover:bg-muted/50
                                hover:text-foreground
                            "
                        >
                            {item.label}
                        </Link>
                    ))}

                </nav>

                <div className="hidden items-center gap-2 sm:flex">

                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/merchant/onboarding">
                                Become a merchant
                            </Link>
                        }
                    >
                        Become a merchant
                    </Button>

                    <Button 
                        render={
                            <Link href="/get-started">
                                Get started
                                <ArrowRight />
                            </Link>
                        }
                    />

                </div>

                <div className="lg:hidden">

                    <Sheet>

                        <SheetTrigger 
                            render={
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open navigation"
                                >
                                    <Menu />
                                </Button>
                            }
                        />

                        <SheetContent side="right">

                            <SheetHeader>
                                <SheetTitle>
                                    Stripe for Web3
                                </SheetTitle>
                            </SheetHeader>

                            <div className="mt-8 flex flex-col gap-1">

                                {navigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                            </div>

                            <div className="mt-6 flex flex-col gap-2">

                                <Button
                                    render={
                                        <Link href="/get-started">
                                            Sign in
                                        </Link>
                                    }
                                    variant="outline"
                                />
                                 

                                <Button 
                                    render={
                                        <Link href="/get-started">
                                            Get started
                                            <ArrowRight />
                                        </Link>
                                    }
                                />

                            </div>

                        </SheetContent>

                    </Sheet>

                </div>

            </div>
        </header>
    );
}