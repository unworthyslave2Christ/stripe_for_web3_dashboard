import Link from "next/link";

import {
    Badge,
} from "@/components/ui/badge";

export function OnboardingShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/20">

            <header className="border-b bg-background">

                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

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

                    <Badge variant="outline">
                        Secure onboarding
                    </Badge>

                </div>

            </header>

            <main>
                {children}
            </main>

        </div>
    );
}