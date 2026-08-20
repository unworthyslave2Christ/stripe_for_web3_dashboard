import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"


import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import { cva, type VariantProps } from "class-variance-authority"


import {
    ReceiptText,
} from "lucide-react";
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import Link from "next/link";
import { Input as InputPrimitive } from "@base-ui/react/input"


import { Select as SelectPrimitive } from "@base-ui/react/select"



/* ============================================================
   FLATTENED SOURCE: app\portal\billing\page.tsx
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
   FLATTENED SOURCE: components\layout\Section.tsx
   ============================================================ */



////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface SectionProps {
    children: ReactNode;

    title?: ReactNode;

    description?: ReactNode;

    actions?: ReactNode;

    className?: string;
}

////////////////////////////////////////////////////////////
// SECTION
////////////////////////////////////////////////////////////

function Section({
    children,

    title,

    description,

    actions,

    className,
}: SectionProps) {
    return (
        <section
            className={cn(
                "space-y-4",
                className,
            )}
        >
            {(title || description || actions) && (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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

                    {actions && (
                        <div className="shrink-0">
                            {actions}
                        </div>
                    )}
                </div>
            )}

            {children}
        </section>
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
   FLATTENED SOURCE: components\portal\billing\CustomerBillingHeader.tsx
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



function CustomerBillingHeader() {
    return (
        <div>

            <div className="flex items-center gap-2">

                <p className="text-sm font-medium text-muted-foreground">
                    Customer portal
                </p>

                <Badge variant="secondary">
                    Smart Account
                </Badge>

            </div>

            <div className="mt-1 flex items-center gap-2">

                <ReceiptText className="size-5 text-muted-foreground" />

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Billing
                </h1>

            </div>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Review upcoming charges, billing history, payment outcomes, and refunds associated with your subscriptions.
            </p>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingOverview.tsx
   ============================================================ */


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
   FLATTENED SOURCE: components\portal\billing\CustomerBillingOverviewCard.tsx
   ============================================================ */


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



function CustomerBillingOverviewCard({
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
        <Card className="p-5">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 truncate text-2xl font-semibold tracking-tight">
                        {value}
                    </p>

                </div>

                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                    <Icon className="size-4 text-muted-foreground" />

                </div>

            </div>

            <p className="mt-4 text-xs text-muted-foreground">
                {description}
            </p>

        </Card>
    );
}



function CustomerBillingOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your billing activity."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerBillingOverviewCard
                    title="Total billed"
                    value="$84.00"
                    description="Lifetime billing"
                    icon={CircleDollarSign}
                />

                <CustomerBillingOverviewCard
                    title="Next charge"
                    value="$19.00"
                    description="Scheduled for Jun 12"
                    icon={CalendarClock}
                />

                <CustomerBillingOverviewCard
                    title="Successful charges"
                    value="6"
                    description="All completed charges"
                    icon={CheckCircle2}
                />

                <CustomerBillingOverviewCard
                    title="Refunds"
                    value="$0.00"
                    description="Lifetime refunds"
                    icon={RotateCcw}
                />

            </Grid>
        </Section>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingInformation.tsx
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



function CustomerBillingInformation() {
    const [
        copied,
        setCopied,
    ] = useState(false);

    const smartAccount =
        "0xf1cc103c9b156eE9c2C496f582075a3086eC2347";

    async function copyAddress() {
        await navigator.clipboard.writeText(
            smartAccount,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Billing information
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <div className="rounded-lg border bg-muted/20 p-4">

                    <div className="flex items-center gap-2">

                        <WalletCards className="size-4 text-muted-foreground" />

                        <p className="text-sm font-medium">
                            Billing Smart Account
                        </p>

                    </div>

                    <p className="mt-2 break-all font-mono text-xs leading-6 text-muted-foreground">
                        {smartAccount}
                    </p>

                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={copyAddress}
                    >
                        <Copy />

                        {copied
                            ? "Copied"
                            : "Copy address"}
                    </Button>

                </div>

                <div className="flex gap-3 rounded-lg border bg-muted/20 p-4">

                    <ShieldCheck className="mt-0.5 size-4 text-emerald-600 dark:text-emerald-400" />

                    <div>

                        <p className="text-sm font-medium">
                            Billing authorization active
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Your active subscriptions are authorized through
                            the permission associated with your Smart Account.
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingList.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingListItem.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingAmount.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\customer-billing.types.ts
   ============================================================ */



type CustomerBillingStatus =
    | "SUCCEEDED"
    | "PENDING"
    | "FAILED"
    | "REFUNDED";

type CustomerBillingInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

interface CustomerBillingRecord {
    id: string;

    billingId: string;

    subscriptionId: number;

    planName: string;

    amount: string;

    currency: string;

    status: CustomerBillingStatus;

    interval: CustomerBillingInterval;

    processedAt: string;

    smartAccount: string;

    transactionHash: string | null;

    refundAmount: string | null;
}



function CustomerBillingAmount({
    amount,
    currency,
    interval,
}: {
    amount: string;
    currency: string;
    interval: CustomerBillingInterval;
}) {
    return (
        <div>

            <p className="text-lg font-semibold tracking-tight">
                {currency} {amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                {formatInterval(interval)}
            </p>

        </div>
    );
}

function formatInterval(
    interval: CustomerBillingInterval,
) {
    switch (interval) {
        case "DAY":
            return "Daily";

        case "WEEK":
            return "Weekly";

        case "YEAR":
            return "Yearly";

        default:
            return "Monthly";
    }
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingStatusBadge.tsx
   ============================================================ */



function CustomerBillingStatusBadge({
    status,
}: {
    status: CustomerBillingStatus;
}) {
    switch (status) {
        case "SUCCEEDED":
            return (
                <Badge variant="secondary">
                    Succeeded
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        case "FAILED":
            return (
                <Badge variant="destructive">
                    Failed
                </Badge>
            );

        case "REFUNDED":
            return (
                <Badge variant="outline">
                    Refunded
                </Badge>
            );
    }
}



function CustomerBillingListItem({
    billing,
}: {
    billing: CustomerBillingRecord;
}) {
    return (
        <Card className="transition-colors hover:border-foreground/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* BILLING IDENTITY */}

                    <div className="flex min-w-0 flex-1 items-start gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                            <CreditCard className="size-4 text-muted-foreground" />

                        </div>

                        <div className="min-w-0">

                            <Link
                                href={`/portal/subscriptions/${billing.subscriptionId}`}
                                className="block truncate text-sm font-semibold hover:underline"
                            >
                                {billing.planName}
                            </Link>

                            <p className="mt-1 font-mono text-xs text-muted-foreground">
                                {billing.billingId}
                            </p>

                        </div>

                    </div>

                    {/* AMOUNT */}

                    <div className="shrink-0">

                        <CustomerBillingAmount
                            amount={
                                billing.amount
                            }
                            currency={
                                billing.currency
                            }
                            interval={
                                billing.interval
                            }
                        />

                    </div>

                    {/* STATUS */}

                    <div className="shrink-0">

                        <CustomerBillingStatusBadge
                            status={
                                billing.status
                            }
                        />

                    </div>

                    {/* DATE */}

                    <div className="min-w-[150px]">

                        <p className="text-xs text-muted-foreground">
                            Processed
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm">

                            <CalendarClock className="size-3.5 text-muted-foreground" />

                            {billing.processedAt}

                        </p>

                    </div>

                    {/* ACTION */}

                    <div className="shrink-0">

                        <Button
                            variant="outline"
                            size="sm"
                        >
                            Details
                            <ExternalLink />
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}



const billing: CustomerBillingRecord[] = [
    {
        id: "billing_001",
        billingId: "billing_8F42A1",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 12, 2025 · 09:41",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x8f91...a21d",
        refundAmount: null,
    },
    {
        id: "billing_002",
        billingId: "billing_7D28B4",
        subscriptionId: 10031,
        planName: "Analytics",
        amount: "9",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Jun 20, 2025 · 10:17",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x2c51...f8ad",
        refundAmount: null,
    },
    {
        id: "billing_003",
        billingId: "billing_1F33C9",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "May 12, 2025 · 09:42",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x7d18...2f6b",
        refundAmount: null,
    },
    {
        id: "billing_004",
        billingId: "billing_19A821",
        subscriptionId: 10021,
        planName: "Pro",
        amount: "19",
        currency: "USD",
        status: "SUCCEEDED",
        interval: "MONTH",
        processedAt: "Apr 12, 2025 · 09:40",
        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",
        transactionHash:
            "0x122a...98f3",
        refundAmount: null,
    },
];

function CustomerBillingList() {
    return (
        <div className="space-y-3">

            {billing.map((record) => (
                <CustomerBillingListItem
                    key={record.id}
                    billing={record}
                />
            ))}

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingPagination.tsx
   ============================================================ */



function CustomerBillingPagination() {
    return (
        <div className="flex items-center justify-between border-t pt-4">

            <p className="text-sm text-muted-foreground">
                Showing 4 billing events
            </p>

            <div className="flex items-center gap-1">

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled
                >
                    <ChevronLeft />
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    className="size-8"
                >
                    1
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerBillingToolbar.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\input.tsx
   ============================================================ */



function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}


/* ============================================================
   FLATTENED SOURCE: components\ui\select.tsx
   ============================================================ */



const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}



function CustomerBillingToolbar() {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-xs">

                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search billing..."
                    className="pl-9"
                />

            </div>

            <Select defaultValue="all">

                <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="succeeded">
                        Succeeded
                    </SelectItem>

                    <SelectItem value="pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="failed">
                        Failed
                    </SelectItem>

                    <SelectItem value="refunded">
                        Refunded
                    </SelectItem>

                </SelectContent>

            </Select>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\billing\CustomerUpcomingBilling.tsx
   ============================================================ */



function CustomerUpcomingBilling() {
    return (
        <Card className="overflow-hidden">

            <CardHeader>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <CardTitle>
                            Upcoming billing
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your next scheduled subscription charge.
                        </p>

                    </div>

                    <Badge variant="secondary">
                        Scheduled
                    </Badge>

                </div>

            </CardHeader>

            <CardContent>

                <div className="rounded-xl border bg-muted/20 p-5">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-4">

                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <CreditCard className="size-4" />
                            </div>

                            <div>

                                <Link
                                    href="/portal/subscriptions"
                                    className="font-medium hover:underline"
                                >
                                    Pro subscription
                                </Link>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Subscription #10021
                                </p>

                                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">

                                    <CalendarClock className="size-4" />

                                    Jun 12, 2025

                                </p>

                            </div>

                        </div>

                        <div className="text-left lg:text-right">

                            <p className="text-2xl font-semibold">
                                $19.00
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Monthly recurring charge
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">

                            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />

                            Billing authorization active

                        </div>

                        <Button
                            render={
                                <Link href="/portal/subscriptions">
                                    View subscription
                                    <ArrowRight />
                                </Link>
                            }
                            variant="outline"
                            size="sm"
                        />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}



function CustomerBillingPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerBillingHeader />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerBillingOverview />

                    {/* UPCOMING */}

                    <Section
                        title="Upcoming billing"
                        description="Your next scheduled subscription charge."
                    >

                        <CustomerUpcomingBilling />

                    </Section>

                    {/* HISTORY */}

                    <Section
                        title="Billing history"
                        description="Charges and billing outcomes associated with your subscriptions."
                    >

                        <Stack gap={4}>

                            <CustomerBillingToolbar />

                            <CustomerBillingList />

                            <CustomerBillingPagination />

                        </Stack>

                    </Section>

                    {/* INFORMATION */}

                    <Section
                        title="Billing information"
                        description="How your Smart Account participates in recurring billing."
                    >

                        <CustomerBillingInformation />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}
