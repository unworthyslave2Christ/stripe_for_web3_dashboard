"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
    usePathname,
} from "next/navigation";

import {
    usePrivy,
} from "@privy-io/react-auth";

import {
    CustomerPortalMobileNav,
} from "./CustomerPortalMobileNav";

import {
    CustomerPortalSidebar,
} from "./CustomerPortalSidebar";

import {
    CustomerPortalTopbar,
} from "./CustomerPortalTopbar";

export function CustomerPortalShell({
    children,
}: {
    children:
        React.ReactNode;
}) {
    const router =
        useRouter();

    const pathname =
        usePathname();

    const {
        ready,
        authenticated,
    } = usePrivy();

    const [
        mobileNavOpen,
        setMobileNavOpen,
    ] = useState(false);

    useEffect(() => {
        if (
            !ready
        ) {
            return;
        }

        if (
            !authenticated
        ) {
            router.replace(
                `/customer/onboarding?returnTo=${encodeURIComponent(
                    pathname,
                )}`,
            );
        }
    }, [
        ready,
        authenticated,
        router,
        pathname,
    ]);

    if (
        !ready
    ) {
        return (
            <PortalShellSkeleton />
        );
    }

    if (
        !authenticated
    ) {
        return (
            <PortalShellSkeleton />
        );
    }

    return (
        <div className="min-h-screen bg-background">

            <CustomerPortalSidebar />

            <CustomerPortalMobileNav
                open={
                    mobileNavOpen
                }
                onClose={() =>
                    setMobileNavOpen(
                        false,
                    )
                }
            />

            <div className="lg:pl-60">

                <CustomerPortalTopbar
                    onOpenMobileNav={() =>
                        setMobileNavOpen(
                            true,
                        )
                    }
                />

                <main>
                    {children}
                </main>

            </div>

        </div>
    );
}

function PortalShellSkeleton() {
    return (
        <div className="min-h-screen bg-background">

            <div className="h-16 border-b bg-background" />

            <div className="p-6">

                <div className="mx-auto max-w-7xl space-y-4">

                    <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />

                    <div className="h-4 w-[500px] max-w-full animate-pulse rounded-md bg-muted" />

                    <div className="h-64 animate-pulse rounded-xl bg-muted" />

                </div>

            </div>

        </div>
    );
}