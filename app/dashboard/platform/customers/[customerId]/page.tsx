"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    CalendarClock,
    CheckCircle2,
    CircleDollarSign,
    Code2,
    CreditCard,
    DollarSign,
    ExternalLink,
    MoreHorizontal,
    PauseCircle,
    Settings2,
    ShieldCheck,
    UserPlus,
    Wallet,
    WalletCards,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import Link from "next/link";

import {
    usePrivy,
} from "@privy-io/react-auth";

import {
    usePublicClient,
    useWalletClient,
} from "wagmi";

import type {
    Address,
    PublicClient,
    WalletClient,
} from "viem";

import {
    CustomerClient,
} from "@stripe-for-web3/customer";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import {
    Menu as MenuPrimitive,
} from "@base-ui/react/menu";

import {
    mergeProps,
} from "@base-ui/react/merge-props";

import {
    useRender,
} from "@base-ui/react/use-render";

import { ReactNode } from "react";

/* ============================================================
   UTILS
   ============================================================ */

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/* ============================================================
   BUTTON
   ============================================================ */

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/80",
                outline:
                    "border-border bg-background hover:bg-muted hover:text-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost:
                    "hover:bg-muted hover:text-foreground",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20",
                link:
                    "text-primary underline-offset-4 hover:underline",
            },

            size: {
                default: "h-8 gap-1.5 px-2.5",
                sm: "h-7 gap-1 px-2.5 text-[0.8rem]",
                lg: "h-9 gap-1.5 px-2.5",
                icon: "size-8",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: ButtonPrimitive.Props &
    VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(
                buttonVariants({
                    variant,
                    size,
                    className,
                }),
            )}
            {...props}
        />
    );
}

/* ============================================================
   BADGE
   ============================================================ */

const badgeVariants = cva(
    "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground",
                destructive:
                    "bg-destructive/10 text-destructive",
                outline:
                    "border-border text-foreground",
                ghost:
                    "hover:bg-muted hover:text-muted-foreground",
            },
        },

        defaultVariants: {
            variant: "default",
        },
    },
);

function Badge({
    className,
    variant = "default",
    render,
    ...props
}: useRender.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants>) {
    return useRender({
        defaultTagName: "span",

        props: mergeProps<"span">(
            {
                className: cn(
                    badgeVariants({
                        variant,
                    }),
                    className,
                ),
            },
            props,
        ),

        render,

        state: {
            slot: "badge",
            variant,
        },
    });
}

/* ============================================================
   AVATAR
   ============================================================ */

function Avatar({
    className,
    size = "default",
    ...props
}: AvatarPrimitive.Root.Props & {
    size?: "default" | "sm" | "lg";
}) {
    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            data-size={size}
            className={cn(
                "group/avatar relative flex size-8 shrink-0 rounded-full select-none",
                "after:absolute after:inset-0 after:rounded-full after:border after:border-border",
                "data-[size=lg]:size-10 data-[size=sm]:size-6",
                className,
            )}
            {...props}
        />
    );
}

function AvatarFallback({
    className,
    ...props
}: AvatarPrimitive.Fallback.Props) {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className={cn(
                "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

/* ============================================================
   CARD
   ============================================================ */

function Card({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "group/card flex flex-col overflow-hidden rounded-xl bg-card text-sm text-card-foreground ring-1 ring-foreground/10",
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "grid gap-1 rounded-t-xl px-4 py-4",
                className,
            )}
            {...props}
        />
    );
}

function CardTitle({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "font-heading text-base font-medium leading-snug",
                className,
            )}
            {...props}
        />
    );
}

function CardContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "px-4 pb-4",
                className,
            )}
            {...props}
        />
    );
}

/* ============================================================
   LAYOUT
   ============================================================ */

function Container({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
                className,
            )}
        >
            {children}
        </div>
    );
}

function Page({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <main
            className={cn(
                "min-h-full",
                className,
            )}
        >
            {children}
        </main>
    );
}

function Divider() {
    return (
        <SeparatorPrimitive
            orientation="horizontal"
            className="h-px w-full shrink-0 bg-border"
        />
    );
}

function Grid({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "grid gap-4",
                className,
            )}
            {...props}
        />
    );
}

function Stack({
    children,
    className,
    gap = 4,
}: {
    children: ReactNode;
    className?: string;
    gap?: 4 | 6 | 8;
}) {
    return (
        <div
            className={cn(
                "flex flex-col",
                gap === 4 && "gap-4",
                gap === 6 && "gap-6",
                gap === 8 && "gap-8",
                className,
            )}
        >
            {children}
        </div>
    );
}

function Section({
    title,
    description,
    children,
}: {
    title?: ReactNode;
    description?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="space-y-4">
            {(title || description) && (
                <div>
                    {title && (
                        <h2 className="text-lg font-semibold tracking-tight">
                            {title}
                        </h2>
                    )}

                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {children}
        </section>
    );
}

/* ============================================================
   CURRENT CUSTOMER CAPABILITY
   ============================================================ */

interface CustomerRecord {
    customerId: string;
    ownerWallet: Address;
    smartAccount: Address;
    displayName: string;
    email: string;
    status: "ACTIVE" | "SUSPENDED";
    createdAt: Date;
    updatedAt: Date;
}

/**
 * IMPORTANT:
 *
 * At the current SDK stage, the customer-facing SDK exposes
 * getByWallet(), not merchant-side getById().
 *
 * Therefore this page deliberately does not fabricate a
 * CustomerRecord from the route parameter.
 */
function useCustomerDetailBoundary(customerId: string) {
    const [state, setState] = useState<
        "unavailable"
        | "checking"
        | "ready"
        | "error"
    >("checking");

    useEffect(() => {
        /*
         * There is currently no supported SDK operation for:
         *
         *   merchantClient.getCustomer(customerId)
         *
         * so we do not issue a guessed network request here.
         */
        const timer = window.setTimeout(() => {
            setState("unavailable");
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [customerId]);

    return {
        state,
        customer: null as CustomerRecord | null,
    };
}

/* ============================================================
   HEADER
   ============================================================ */

function CustomerDetailBreadcrumb({
    customerId,
}: {
    customerId: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
        >
            <Link
                href="/dashboard/platform/customers"
                className="text-muted-foreground hover:text-foreground"
            >
                Customers
            </Link>

            <span className="text-muted-foreground">/</span>

            <span className="font-medium">
                {customerId}
            </span>
        </nav>
    );
}

function CustomerDetailUnavailable({
    customerId,
}: {
    customerId: string;
}) {
    return (
        <Card className="border-amber-500/20">
            <CardContent className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <ShieldCheck className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="font-medium">
                            Customer detail lookup is not exposed yet
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            This route is ready for the merchant customer-detail
                            resource, but the current customer SDK only exposes
                            wallet-based customer lookup. No synthetic customer,
                            billing, subscription, permission, or transaction
                            values are being displayed.
                        </p>

                        <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                            <p className="text-xs text-muted-foreground">
                                Requested customer ID
                            </p>

                            <code className="mt-1 block break-all font-mono text-xs">
                                {customerId}
                            </code>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                                render={
                                    <Link href="/dashboard/platform/customers">
                                        <ArrowLeft />
                                        Back to customers
                                    </Link>
                                }
                                variant="outline"
                                size="sm"
                            />

                            <Button
                                render={
                                    <Link href="/dashboard/platform/customers">
                                        Customer collection
                                        <ArrowUpRight />
                                    </Link>
                                }
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

/* ============================================================
   REAL CUSTOMER HEADER — USED WHEN GET-BY-ID EXISTS LATER
   ============================================================ */

function CustomerDetailHeader({
    customer,
}: {
    customer: CustomerRecord;
}) {
    const initials =
        customer.displayName
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    return (
        <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                    <Avatar className="size-14">
                        <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {customer.displayName}
                            </h1>

                            <Badge variant="secondary">
                                {customer.status === "ACTIVE"
                                    ? "Active"
                                    : "Suspended"}
                            </Badge>

                            <Badge variant="outline">
                                Customer
                            </Badge>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {customer.customerId}
                        </p>

                        <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                            {customer.smartAccount}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                        <WalletCards />
                        Smart Account
                    </Button>

                    <Button variant="outline">
                        Manage
                    </Button>
                </div>
            </div>
        </Card>
    );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function CustomerDetailPage() {
    const params = useParams<{
        customerId: string;
    }>();

    const customerId =
        params.customerId;

    const lookup =
        useCustomerDetailBoundary(
            customerId,
        );

    return (
        <Page>
            <Container className="py-8 lg:py-10">
                <Stack gap={8}>
                    <CustomerDetailBreadcrumb
                        customerId={customerId}
                    />

                    {lookup.customer ? (
                        <>
                            <CustomerDetailHeader
                                customer={lookup.customer}
                            />

                            {/*
                              Once merchant-side customer retrieval is
                              actually exposed, the existing detail sections
                              can be wired from the canonical resource:

                              - overview
                              - account
                              - subscriptions
                              - billing
                              - permissions
                              - transactions
                              - activity
                              - metadata

                              without changing the page architecture.
                            */}
                        </>
                    ) : (
                        <CustomerDetailUnavailable
                            customerId={customerId}
                        />
                    )}
                </Stack>
            </Container>
        </Page>
    );
}