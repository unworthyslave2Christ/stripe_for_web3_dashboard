"use client";

import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"


import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Info,
} from "lucide-react";
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cva, type VariantProps } from "class-variance-authority"


import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import {
    useQuery,
} from "@tanstack/react-query";
import {
    usePrivy,
} from "@privy-io/react-auth";
import {
    usePublicClient,
    useWalletClient,
} from "wagmi";
import type {
    PublicClient,
    WalletClient,
} from "viem";
import {
    CustomerClient,
} from "@stripe-for-web3/customer";

/* ============================================================
   FLATTENED SOURCE: app\portal\page.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\layout\Container.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\utils.ts
   ============================================================ */



function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface ContainerProps {
    children: ReactNode;

    className?: string;
}

////////////////////////////////////////////////////////////
// CONTAINER
////////////////////////////////////////////////////////////

function Container({
    children,

    className,
}: ContainerProps) {
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


/* ============================================================
   FLATTENED SOURCE: components\layout\Divider.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\separator.tsx
   ============================================================ */



function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}



function Divider() {
    return <Separator />;
}


/* ============================================================
   FLATTENED SOURCE: components\layout\Grid.tsx
   ============================================================ */



function Grid({
    className,
    ...props
}: ComponentProps<"div">) {
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


/* ============================================================
   FLATTENED SOURCE: components\layout\Page.tsx
   ============================================================ */



////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface PageProps {
    children: ReactNode;

    className?: string;
}

////////////////////////////////////////////////////////////
// PAGE
////////////////////////////////////////////////////////////

function Page({
    children,

    className,
}: PageProps) {
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


/* ============================================================
   FLATTENED SOURCE: components\layout\Stack.tsx
   ============================================================ */



////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface StackProps {
    children: ReactNode;

    className?: string;

    gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

////////////////////////////////////////////////////////////
// STACK
////////////////////////////////////////////////////////////

function Stack({
    children,

    className,

    gap = 4,
}: StackProps) {
    return (
        <div
            className={cn(
                "flex flex-col",
                gapClasses[gap],
                className,
            )}
        >
            {children}
        </div>
    );
}

const gapClasses = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
};


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerActivityPreview.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\button.tsx
   ============================================================ */



const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}


/* ============================================================
   FLATTENED SOURCE: components\ui\card.tsx
   ============================================================ */



function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}



function CustomerActivityPreview({
    items,
    demo,
}: {
    items: {
        id: string;

        title: string;

        description: string;

        timestamp: string;

        status:
            | "success"
            | "info";
    }[];

    demo: boolean;
}) {
    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-3">

                    <div>

                        <CardTitle>
                            Recent activity
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Recent events involving your account.
                        </p>

                    </div>

                    <Button
                        render={
                            <Link href="/portal/transactions">
                                View all
                                <ArrowRight />
                            </Link>
                        }
                        variant="ghost"
                        size="sm"
                    />

                </div>

            </CardHeader>

            <CardContent>

                {demo && (
                    <p className="mb-4 text-xs text-muted-foreground">
                        Activity preview is currently using test data.
                    </p>
                )}

                <div className="space-y-4">

                    {items.map(
                        (item) => (
                            <div
                                key={item.id}
                                className="flex gap-3"
                            >

                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">

                                    {item.status ===
                                    "success" ? (
                                        <CheckCircle2 className="size-4 text-primary" />
                                    ) : (
                                        <Info className="size-4 text-muted-foreground" />
                                    )}

                                </div>

                                <div className="min-w-0">

                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.timestamp}
                                    </p>

                                </div>

                            </div>
                        ),
                    )}

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerOverviewEmptyState.tsx
   ============================================================ */



function CustomerOverviewEmptyState() {
    return (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-muted">

                <WalletCards className="size-5 text-muted-foreground" />

            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Your customer account isn't ready yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Complete customer onboarding to create or recover your Smart Account and access the customer portal.
            </p>

            <Button
                render={
                    <Link href="/customer/onboarding">
                        Complete onboarding
                        <ArrowRight />
                    </Link>
                }
                className="mt-5"
            />

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerOverviewErrorState.tsx
   ============================================================ */



function CustomerOverviewErrorState({
    error,
    onRetry,
}: {
    error: Error;

    onRetry: () => void;
}) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">

            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">

                <AlertTriangle className="size-5 text-destructive" />

            </div>

            <h2 className="mt-4 text-lg font-semibold">
                Unable to load your account
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {error.message}
            </p>

            <Button
                variant="outline"
                className="mt-5"
                onClick={onRetry}
            >
                <RefreshCw />
                Try again
            </Button>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerOverviewHeader.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\badge.tsx
   ============================================================ */



const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}



function CustomerOverviewHeader({
    customerName,
    smartAccount,
    mode,
}: {
    customerName:
        | string
        | undefined;

    smartAccount:
        | string
        | undefined;

    mode:
        | "demo"
        | "live";
}) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

                <div className="flex flex-wrap items-center gap-2">

                    <p className="text-sm font-medium text-muted-foreground">
                        Customer portal
                    </p>

                    {mode === "demo" && (
                        <Badge variant="outline">
                            Test mode
                        </Badge>
                    )}

                </div>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Welcome back
                    {customerName
                        ? `, ${customerName}`
                        : ""}
                    .
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Manage your Smart Account, subscriptions, billing,
                    transactions, permissions, and account activity.
                </p>

            </div>

            <div className="rounded-xl border bg-card px-4 py-3">

                <div className="flex items-center gap-3">

                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">

                        <ShieldCheck className="size-4 text-primary" />

                    </div>

                    <div>

                        <p className="text-xs text-muted-foreground">
                            Smart Account
                        </p>

                        <p className="mt-1 font-mono text-xs">
                            {smartAccount
                                ? `${smartAccount.slice(0, 8)}...${smartAccount.slice(-6)}`
                                : "Not created"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerOverviewKpiCard.tsx
   ============================================================ */



function CustomerOverviewKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;

    value: string;

    description: string;

    icon: LucideIcon;
}) {
    return (
        <Card>

            <CardContent className="p-5">

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-sm text-muted-foreground">
                            {title}
                        </p>

                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                            {value}
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            {description}
                        </p>

                    </div>

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">

                        <Icon className="size-4 text-muted-foreground" />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerOverviewLoadingState.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\skeleton.tsx
   ============================================================ */



function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}



function CustomerOverviewLoadingState() {
    return (
        <div className="space-y-6">

            <div className="space-y-3">

                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-9 w-72" />

                <Skeleton className="h-4 w-[520px] max-w-full" />

            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({
                    length: 4,
                }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border bg-card p-5"
                        >
                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="mt-4 h-8 w-24" />

                            <Skeleton className="mt-4 h-3 w-32" />
                        </div>
                    ),
                )}

            </div>

            <div className="grid gap-4 lg:grid-cols-2">

                <div className="rounded-xl border bg-card p-5">
                    <Skeleton className="h-5 w-32" />

                    <Skeleton className="mt-6 h-[220px] w-full" />
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <Skeleton className="h-5 w-32" />

                    <Skeleton className="mt-6 h-32 w-full" />
                </div>

            </div>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerQuickActions.tsx
   ============================================================ */



function CustomerQuickActions() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Quick actions
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">

                <Action
                    href="/portal/subscriptions"
                    icon={CreditCard}
                    label="Manage subscriptions"
                />

                <Action
                    href="/portal/smart-account"
                    icon={WalletCards}
                    label="View Smart Account"
                />

                <Action
                    href="/portal/permissions"
                    icon={ShieldCheck}
                    label="Review permissions"
                />

            </CardContent>

        </Card>
    );
}

function Action({
    href,
    icon: Icon,
    label,
}: {
    href: string;

    icon: typeof CreditCard;

    label: string;
}) {
    return (
        <Button
            render={
                <Link href={href}>

                    <span className="flex items-center gap-2">

                        <Icon className="size-4" />

                        {label}

                    </span>

                    <ArrowRight />

                </Link>
            }
            variant="outline"
            className="h-auto w-full justify-between px-3 py-3"
        />
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerRevenueCard.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: hooks\ui\useAnimatedNumber.ts
   ============================================================ */



function useAnimatedNumber(
    target: number,
    duration = 700,
) {
    const [
        value,
        setValue,
    ] = useState(target);

    const currentValue =
        useRef(target);

    useEffect(() => {

        const start =
            currentValue.current;

        const delta =
            target -
            start;

        if (
            Math.abs(delta) <
            0.001
        ) {
            currentValue.current =
                target;

            setValue(target);

            return;
        }

        const startTime =
            performance.now();

        let frameId =
            0;

        function animate(
            now: number,
        ) {
            const elapsed =
                now -
                startTime;

            const progress =
                Math.min(
                    elapsed /
                        duration,
                    1,
                );

            const eased =
                1 -
                Math.pow(
                    1 -
                        progress,
                    3,
                );

            const nextValue =
                start +
                delta *
                    eased;

            currentValue.current =
                nextValue;

            setValue(
                nextValue,
            );

            if (
                progress <
                1
            ) {
                frameId =
                    requestAnimationFrame(
                        animate,
                    );
            }
        }

        frameId =
            requestAnimationFrame(
                animate,
            );

        return () => {
            cancelAnimationFrame(
                frameId,
            );
        };
    }, [
        target,
        duration,
    ]);

    return value;
}



function CustomerRevenueCard({
    monthlyUsd,
    previousMonthlyUsd,
    series,
    demo,
}: {
    monthlyUsd: number;

    previousMonthlyUsd: number;

    series: {
        label: string;

        value: number;
    }[];

    demo: boolean;
}) {
    const animatedValue =
        useAnimatedNumber(
            monthlyUsd,
        );

    const change =
        previousMonthlyUsd ===
        0
            ? 0
            : (
                (
                    monthlyUsd -
                    previousMonthlyUsd
                ) /
                previousMonthlyUsd
            ) *
                100;

    const width =
        700;

    const height =
        220;

    const padding =
        24;

    const values =
        series.map(
            (item) =>
                item.value,
        );

    const max =
        Math.max(
            ...values,
            1,
        );

    const min =
        Math.min(
            ...values,
            0,
        );

    const range =
        Math.max(
            max -
                min,
            1,
        );

    const coordinates =
        series.map(
            (
                item,
                index,
            ) => {

                const x =
                    padding +
                    (
                        index /
                        Math.max(
                            series.length -
                                1,
                            1,
                        )
                    ) *
                        (
                            width -
                            padding * 2
                        );

                const y =
                    height -
                    padding -
                    (
                        (
                            item.value -
                            min
                        ) /
                        range
                    ) *
                        (
                            height -
                            padding * 2
                        );

                return {
                    x,
                    y,
                };
            },
        );

    const path =
        coordinates
            .map(
                (
                    point,
                    index,
                ) =>
                    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
            )
            .join(" ");

    return (
        <Card>

            <CardHeader>

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <CardTitle>
                            Billing value
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Estimated recurring value.
                        </p>

                    </div>

                    {demo && (
                        <Badge variant="outline">
                            Test mode
                        </Badge>
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <div className="flex items-end justify-between gap-4">

                    <div>

                        <p className="text-3xl font-semibold tracking-tight">
                            $
                            {animatedValue.toFixed(
                                2,
                            )}
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            {change >= 0
                                ? "+"
                                : ""}
                            {change.toFixed(
                                1,
                            )}
                            % from previous period
                        </p>

                    </div>

                </div>

                <div className="mt-6 overflow-hidden rounded-xl border bg-muted/20 p-3">

                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        className="h-[220px] w-full"
                    >

                        <path
                            d={path}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                        />

                        {coordinates.map(
                            (
                                point,
                                index,
                            ) => (
                                <circle
                                    key={index}
                                    cx={
                                        point.x
                                    }
                                    cy={
                                        point.y
                                    }
                                    r="3.5"
                                    className="fill-primary"
                                />
                            ),
                        )}

                    </svg>

                    <div className="grid grid-cols-6 gap-2">

                        {series.map(
                            (
                                item,
                            ) => (
                                <p
                                    key={
                                        item.label
                                    }
                                    className="text-center text-[10px] text-muted-foreground"
                                >
                                    {
                                        item.label
                                    }
                                </p>
                            ),
                        )}

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerSmartAccountCard.tsx
   ============================================================ */



function CustomerSmartAccountCard({
    smartAccount,
}: {
    smartAccount:
        | string
        | undefined;
}) {
    const ready =
        Boolean(
            smartAccount,
        );

    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-3">

                    <CardTitle>
                        Smart Account
                    </CardTitle>

                    {ready ? (
                        <Badge variant="secondary">
                            <CheckCircle2 />
                            Ready
                        </Badge>
                    ) : (
                        <Badge variant="outline">
                            Not created
                        </Badge>
                    )}

                </div>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

                    <ShieldCheck className="size-5 text-primary" />

                </div>

                {ready ? (
                    <>
                        <div>

                            <p className="text-sm text-muted-foreground">
                                Your account
                            </p>

                            <code className="mt-2 block break-all rounded-lg border bg-muted/20 p-3 font-mono text-xs leading-5">
                                {smartAccount}
                            </code>

                        </div>

                        <div className="flex flex-wrap gap-2">

                            <Button
                                variant="outline"
                                size="sm"
                            >
                                <Copy />
                                Copy
                            </Button>

                            <Button
                                render={
                                    <Link href="/portal/smart-account">
                                        Manage
                                        <ArrowRight />
                                    </Link>
                                }
                                size="sm"
                                variant="outline"
                            />

                        </div>
                    </>
                ) : (
                    <div>

                        <p className="text-sm font-medium">
                            Your Smart Account is not available yet.
                        </p>

                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            Complete customer onboarding to create your Smart Account.
                        </p>

                    </div>
                )}

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\overview\CustomerSubscriptionSummary.tsx
   ============================================================ */



function CustomerSubscriptionSummary({
    total,
    active,
    paused,
    cancelled,
}: {
    total: number;

    active: number;

    paused: number;

    cancelled: number;
}) {
    return (
        <Card>

            <CardHeader>

                <div className="flex items-center justify-between gap-3">

                    <CardTitle>
                        Subscriptions
                    </CardTitle>

                    <Button
                        render={
                            <Link href="/portal/subscriptions">
                                View all
                                <ArrowRight />
                            </Link>
                        }
                        size="sm"
                        variant="ghost"
                    />

                </div>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="flex items-center gap-3">

                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">

                        <CreditCard className="size-5 text-muted-foreground" />

                    </div>

                    <div>

                        <p className="text-2xl font-semibold">
                            {total}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Total subscriptions
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-3 gap-2">

                    <SummaryMetric
                        label="Active"
                        value={active}
                        variant="secondary"
                    />

                    <SummaryMetric
                        label="Paused"
                        value={paused}
                        variant="outline"
                    />

                    <SummaryMetric
                        label="Cancelled"
                        value={cancelled}
                        variant="outline"
                    />

                </div>

                <div className="flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">

                    <CalendarClock className="size-3.5" />

                    Subscription billing is managed through your Smart Account.

                </div>

            </CardContent>

        </Card>
    );
}

function SummaryMetric({
    label,
    value,
    variant,
}: {
    label: string;

    value: number;

    variant:
        | "secondary"
        | "outline";
}) {
    return (
        <div className="rounded-lg border bg-muted/20 p-3">

            <p className="text-lg font-semibold">
                {value}
            </p>

            <Badge
                variant={variant}
                className="mt-2"
            >
                {label}
            </Badge>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: hooks\pages\customer\useCustomerOverviewPage.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: hooks\customer\useCustomer.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: hooks\wallet\useConnectedWallet.ts
   ============================================================ */



////////////////////////////////////////////////////////////
// RESULT
////////////////////////////////////////////////////////////

interface ConnectedWalletState {
    ready: boolean;

    authenticated: boolean;

    address:
        | string
        | undefined;
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

function useConnectedWallet(): ConnectedWalletState {
    const {
        ready,
        authenticated,
        user,
    } =
        usePrivy();

    return {
        ready,

        authenticated,

        address:
            user?.wallet?.address,
    };
}


/* ============================================================
   FLATTENED SOURCE: hooks\customer\useCustomerClient.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\sdk\createCustomerClient.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: app\config.ts
   ============================================================ */



////////////////////////////////////////////////////////////
// APPLICATION CONFIGURATION
////////////////////////////////////////////////////////////

const appConfig = {
    name:
        "Stripe for Web3",

    apiUrl:
        process.env.NEXT_PUBLIC_API_URL as string,

    billingContractAddress:
        process.env.NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS! as Address,

    demoMode:
        process.env .NEXT_PUBLIC_DEMO_MODE === "true",
};

////////////////////////////////////////////////////////////
// CONFIGURATION VALIDATION
////////////////////////////////////////////////////////////

function validateAppConfig() {
    if (!appConfig.apiUrl) {
        throw new Error(
            "API_URL is not configured.",
        );
    }

    if (
        !appConfig.billingContractAddress
    ) {
        throw new Error(
            "BILLING_CONTRACT_ADDRESS is not configured.",
        );
    }
}



////////////////////////////////////////////////////////////
// FACTORY
////////////////////////////////////////////////////////////

function createCustomerClient({
    walletClient,
    publicClient,
}: {
    walletClient:
        WalletClient;

    publicClient:
        PublicClient;
}): CustomerClient {
    return new CustomerClient({
        walletClient,

        publicClient,

        contractAddress:
            appConfig.billingContractAddress,

        apiUrl:
            appConfig.apiUrl,
    });
}



function useCustomerClient() {
    const {
        data:
            walletClient,
    } =
        useWalletClient();

    const publicClient =
        usePublicClient();

    const client =
        useMemo(
            () => {

                if (
                    !walletClient ||
                    !publicClient
                ) {
                    return null;
                }

                return createCustomerClient({
                    walletClient,

                    publicClient,
                });
            },
            [
                walletClient,

                publicClient,
            ],
        );

    return {
        client,

        walletClient,

        publicClient,

        ready:
            Boolean(
                walletClient &&
                publicClient,
            ),
    };
}


/* ============================================================
   FLATTENED SOURCE: lib\query\queryKeys.ts
   ============================================================ */



////////////////////////////////////////////////////////////
// QUERY KEYS
////////////////////////////////////////////////////////////

const queryKeys = {
    customer: {
        all:
            ["customer"] as const,

        byWallet: (
            wallet: string,
        ) =>
            [
                "customer",
                "wallet",
                wallet,
            ] as const,

        byId: (
            customerId: number | string,
        ) =>
            [
                "customer",
                "id",
                customerId,
            ] as const,

        subscriptions: (
            customerId: number | string,
        ) =>
            [
                "customer",
                "subscriptions",
                customerId,
            ] as const,

        subscription: (
            subscriptionId: number,
        ) =>
            [
                "customer",
                "subscription",
                subscriptionId,
            ] as const,

        plan: (
            planId: number,
        ) =>
            [
                "customer",
                "plan",
                planId,
            ] as const,
    },

    merchant: {
        all:
            ["merchant"] as const,

        byId: (
            merchantId: number,
        ) =>
            [
                "merchant",
                merchantId,
            ] as const,

        plans: (
            merchantId: number,
        ) =>
            [
                "merchant",
                "plans",
                merchantId,
            ] as const,
    },
};



////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

function useCustomer() {

    const {
        authenticated,
        address,
    } =
        useConnectedWallet();

    const {
        client,
        ready:
            clientReady,
    } =
        useCustomerClient();

    const query =
        useQuery({
            queryKey:
                address
                    ? queryKeys.customer.byWallet(
                        address,
                    )
                    : queryKeys.customer.all,

            queryFn:
                async () => {

                    if (!client) {
                        throw new Error(
                            "Customer client is not ready.",
                        );
                    }

                    if (!address) {
                        throw new Error(
                            "Customer wallet is not connected.",
                        );
                    }

                    return client.getByWallet(
                        address as `0x${string}`,
                    );
                },

            enabled:
                Boolean(
                    authenticated &&
                    address &&
                    clientReady,
                ),

            retry:
                false,
        });

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    let status:
        | "disconnected"
        | "waiting"
        | "loading"
        | "ready"
        | "not-created"
        | "error";

    if (!authenticated) {

        status =
            "disconnected";

    } else if (
        !address ||
        !clientReady
    ) {

        status =
            "waiting";

    } else if (
        query.isLoading
    ) {

        status =
            "loading";

    } else if (
        query.isError
    ) {

        status =
            "error";

    } else if (
        query.data
    ) {

        status =
            "ready";

    } else {

        status =
            "not-created";
    }

    return {
        customer:
            query.data ??
            null,

        status,

        loading:
            query.isLoading,

        refreshing:
            query.isFetching &&
            !query.isLoading,

        error:
            query.error instanceof Error
                ? query.error
                : null,

        refresh:
            query.refetch,
    };
}


/* ============================================================
   FLATTENED SOURCE: hooks\customer\useSubscriptions.ts
   ============================================================ */



function useSubscriptions() {
    const {
        customer,
        status:
            customerStatus,
    } =
        useCustomer();

    const {
        client,
    } =
        useCustomerClient();

    const customerId =
        customer?.customerId
            ? String(
                customer.customerId,
            )
            : null;

    const query =
        useQuery({
            queryKey:
                customerId
                    ? queryKeys.customer.subscriptions(
                        customerId,
                    )
                    : [
                        "customer",
                        "subscriptions",
                        "none",
                    ],

            queryFn:
                async () => {

                    if (
                        !client ||
                        !customerId
                    ) {
                        return [];
                    }

                    return client.getSubscriptions(
                        customerId,
                    );
                },

            enabled:
                Boolean(
                    client &&
                    customerId &&
                    customerStatus ===
                        "ready",
                ),
        });

    return {
        subscriptions:
            query.data ?? [],

        loading:
            query.isLoading,

        refreshing:
            query.isFetching &&
            !query.isLoading,

        error:
            query.error instanceof Error
                ? query.error
                : null,

        refresh:
            query.refetch,
    };
}


/* ============================================================
   FLATTENED SOURCE: lib\demo\customerOverviewDemo.ts
   ============================================================ */



const customerOverviewDemo = {
    revenue: {
        monthlyUsd: 124.58,

        previousMonthlyUsd: 108.42,

        series: [
            {
                label: "Jan",
                value: 62.14,
            },
            {
                label: "Feb",
                value: 78.31,
            },
            {
                label: "Mar",
                value: 84.27,
            },
            {
                label: "Apr",
                value: 97.44,
            },
            {
                label: "May",
                value: 108.42,
            },
            {
                label: "Jun",
                value: 124.58,
            },
        ],
    },

    billing: {
        successRate: 99.2,
    },

    activity: [
        {
            id: "activity-1",
            title: "Billing authorization verified",
            description:
                "Your Smart Account is ready for recurring billing.",
            timestamp: "2 hours ago",
            status: "success" as const,
        },

        {
            id: "activity-2",
            title: "Subscription payment succeeded",
            description:
                "Your Pro subscription was charged successfully.",
            timestamp: "Yesterday",
            status: "success" as const,
        },

        {
            id: "activity-3",
            title: "Subscription renewed",
            description:
                "Your Pro subscription renewed for another billing period.",
            timestamp: "3 days ago",
            status: "info" as const,
        },
    ],
};



////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

function useCustomerOverviewPage() {

    ////////////////////////////////////////////////////////////
    // REAL CUSTOMER RESOURCE
    ////////////////////////////////////////////////////////////

    const customer =
        useCustomer();

    ////////////////////////////////////////////////////////////
    // REAL SUBSCRIPTION RESOURCE
    ////////////////////////////////////////////////////////////

    const subscriptions =
        useSubscriptions();

    ////////////////////////////////////////////////////////////
    // DERIVED SUBSCRIPTION SUMMARY
    ////////////////////////////////////////////////////////////

    const subscriptionSummary =
        useMemo(() => {

            const items =
                subscriptions.subscriptions;

            const active =
                items.filter(
                    (item: any) =>
                        item.status ===
                        "ACTIVE",
                );

            const paused =
                items.filter(
                    (item: any) =>
                        item.status ===
                        "PAUSED",
                );

            const cancelled =
                items.filter(
                    (item: any) =>
                        item.status ===
                        "CANCELLED",
                );

            return {
                total:
                    items.length,

                active:
                    active.length,

                paused:
                    paused.length,

                cancelled:
                    cancelled.length,
            };

        }, [
            subscriptions.subscriptions,
        ]);

    ////////////////////////////////////////////////////////////
    // DEMO DATA
    ////////////////////////////////////////////////////////////

    const demo =
        appConfig.demoMode
            ? customerOverviewDemo
            : null;

    ////////////////////////////////////////////////////////////
    // PAGE VIEW MODEL
    ////////////////////////////////////////////////////////////

    return {
        mode:
            appConfig.demoMode
                ? "demo"
                : "live",

        customer: {
            data:
                customer.customer,

            status:
                customer.status,

            loading:
                customer.loading,

            refreshing:
                customer.refreshing,

            error:
                customer.error,

            refresh:
                customer.refresh,
        },

        subscriptions: {
            data:
                subscriptions.subscriptions,

            loading:
                subscriptions.loading,

            refreshing:
                subscriptions.refreshing,

            error:
                subscriptions.error,

            refresh:
                subscriptions.refresh,
        },

        subscriptionSummary,

        demo,
    };
}



function CustomerPortalOverviewPage() {

    const page =
        useCustomerOverviewPage();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (
        page.customer.loading &&
        !page.customer.data
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerOverviewLoadingState />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.customer.error &&
        !page.customer.data
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerOverviewErrorState
                        error={
                            page.customer.error
                        }
                        onRetry={
                            page.customer.refresh
                        }
                    />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // NO CUSTOMER
    ////////////////////////////////////////////////////////////

    if (
        page.customer.status ===
        "not-created"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerOverviewEmptyState />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // DATA
    ////////////////////////////////////////////////////////////

    const customer =
        page.customer.data;

    const demo =
        page.demo;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerOverviewHeader
                        customerName={
                            customer?.displayName
                        }
                        smartAccount={
                            customer?.smartAccount
                        }
                        mode={
                            page.demo
                                ? "demo"
                                : "live"
                        }
                    />

                    <Divider />

                    {/* KPIS */}

                    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <CustomerOverviewKpiCard
                            title="Subscriptions"
                            value={
                                page.subscriptionSummary.total.toLocaleString()
                            }
                            description="Total subscriptions"
                            icon={CreditCard}
                        />

                        <CustomerOverviewKpiCard
                            title="Active"
                            value={
                                page.subscriptionSummary.active.toLocaleString()
                            }
                            description="Currently active"
                            icon={Zap}
                        />

                        <CustomerOverviewKpiCard
                            title="Billing value"
                            value={
                                demo
                                    ? `$${demo.revenue.monthlyUsd.toFixed(2)}`
                                    : "—"
                            }
                            description={
                                demo
                                    ? "Test-mode estimate"
                                    : "Awaiting billing data"
                            }
                            icon={WalletCards}
                        />

                        <CustomerOverviewKpiCard
                            title="Authorization"
                            value={
                                customer?.smartAccount
                                    ? "Ready"
                                    : "Pending"
                            }
                            description="Smart Account billing capability"
                            icon={ShieldCheck}
                        />

                    </Grid>

                    {/* PRIMARY */}

                    <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                        {demo && (
                            <CustomerRevenueCard
                                monthlyUsd={
                                    demo.revenue.monthlyUsd
                                }
                                previousMonthlyUsd={
                                    demo.revenue.previousMonthlyUsd
                                }
                                series={
                                    demo.revenue.series
                                }
                                demo
                            />
                        )}

                        <CustomerSmartAccountCard
                            smartAccount={
                                customer?.smartAccount
                            }
                        />

                    </Grid>

                    {/* SUBSCRIPTIONS */}

                    <Grid className="grid-cols-1 gap-4 lg:grid-cols-2">

                        <CustomerSubscriptionSummary
                            total={
                                page.subscriptionSummary.total
                            }
                            active={
                                page.subscriptionSummary.active
                            }
                            paused={
                                page.subscriptionSummary.paused
                            }
                            cancelled={
                                page.subscriptionSummary.cancelled
                            }
                        />

                        <CustomerActivityPreview
                            items={
                                demo?.activity ??
                                []
                            }
                            demo={
                                Boolean(
                                    demo,
                                )
                            }
                        />

                    </Grid>

                    {/* ACTIONS */}

                    <CustomerQuickActions />

                    {/* LIVE STATUS */}

                    {page.subscriptions.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing subscription data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}
