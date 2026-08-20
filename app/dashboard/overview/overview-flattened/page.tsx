import {
    Activity,
    CircleDollarSign,
    CreditCard,
    Users,
} from "lucide-react";
import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import { cva, type VariantProps } from "class-variance-authority"


import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import { Button as ButtonPrimitive } from "@base-ui/react/button"

import type { ReactNode } from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"


import Link from "next/link";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"


import {
    useTheme,
} from "next-themes";
import type { Address } from "viem";

/* ============================================================
   FLATTENED SOURCE: app\dashboard\platform\overview\page.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\badge.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\utils.ts
   ============================================================ */



function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



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
   FLATTENED SOURCE: components\layout\Container.tsx
   ============================================================ */



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
   FLATTENED SOURCE: components\layout\Inline.tsx
   ============================================================ */



////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface InlineProps {
    children: ReactNode;

    className?: string;

    gap?: 1 | 2 | 3 | 4 | 6 | 8;
}

const gapClasses = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
};

////////////////////////////////////////////////////////////
// INLINE
////////////////////////////////////////////////////////////

function Inline({
    children,

    className,

    gap = 4,
}: InlineProps) {
    return (
        <div
            className={cn(
                "flex items-center",
                gapClasses[gap],
                className,
            )}
        >
            {children}
        </div>
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
   FLATTENED SOURCE: components\layout\PageHeader.tsx
   ============================================================ */



////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface PageHeaderProps {
    eyebrow?: ReactNode;

    title: ReactNode;

    description?: ReactNode;

    actions?: ReactNode;

    className?: string;
}

////////////////////////////////////////////////////////////
// PAGE HEADER
////////////////////////////////////////////////////////////

function PageHeader({
    eyebrow,

    title,

    description,

    actions,

    className,
}: PageHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
                className,
            )}
        >
            <div className="min-w-0">
                {eyebrow && (
                    <div className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {eyebrow}
                    </div>
                )}

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 items-center gap-2">
                    {actions}
                </div>
            )}
        </header>
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
   FLATTENED SOURCE: components\dashboard\DashboardShell.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\dashboard\DashboardSidebar.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\avatar.tsx
   ============================================================ */



function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\MerchantSwitcher.tsx
   ============================================================ */



function MerchantSwitcher() {
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


/* ============================================================
   FLATTENED SOURCE: components\dashboard\navigation\navigation.ts
   ============================================================ */



const mainNavigation = [
    {
        label: "Overview",
        href: "/dashboard/platform/overview",
        icon: LayoutDashboard,
    },
    {
        label: "Customers",
        href: "/dashboard/platform/customers",
        icon: Users,
    },
    {
        label: "Plans",
        href: "/dashboard/platform/plans",
        icon: CreditCard,
    },
    {
        label: "Subscriptions",
        href: "/dashboard/platform/subscriptions",
        icon: WalletCards,
    },
    {
        label: "Billing",
        href: "/dashboard/platform/billing",
        icon: Blocks,
    },
    {
        label: "Billing Operators",
        href: "/dashboard/platform/billing-operators",
        icon: Computer,
    },
    {
        label: "Permissions",
        href: "/dashboard/platform/permissions",
        icon: LockOpen,
    },
    
];

const developerNavigation = [
    {
        label: "API Keys",
        href: "/dashboard/developers/api-keys",
        icon: FileKey2,
    },
    {
        label: "Webhooks",
        href: "/dashboard/developers/webhooks",
        icon: Webhook,
    },
    {
        label: "Notifications",
        href: "/dashboard/developers/notifications",
        icon: Bell,
    },
];

const secondaryNavigation = [ 
    {
        label: "Activity",
        href: "/dashboard/account/activity",
        icon: Activity,
    },
    {
        label: "Settings",
        href: "/dashboard/account/settings",
        icon: Settings,
    },
    {
        label: "Documentation",
        href: "#",
        icon: BookOpen,
    },

];



function DashboardSidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-card lg:flex lg:flex-col">

            {/* BRAND */}

            <div className="flex h-16 items-center px-5">
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
            </div>

            <Separator />

            {/* MERCHANT */}

            <div className="p-3">
                <MerchantSwitcher />
            </div>

            {/* NAVIGATION */}

            <div className="flex-1 overflow-y-auto px-3">

                <nav className="space-y-6">

                    <NavigationGroup
                        label="Platform"
                        items={mainNavigation}
                    />

                    <NavigationGroup
                        label="Developers"
                        items={developerNavigation}
                    />

                    <NavigationGroup
                        label="Account"
                        items={secondaryNavigation}
                    />

                </nav>

            </div>

            <Separator />

            {/* USER */}

            <div className="p-3">

                <div className="flex items-center gap-3 rounded-lg p-2">

                    <Avatar className="size-8">
                        <AvatarFallback>
                            AF
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                            ACMEFLOW
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            Merchant account
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                    >
                        <LogOut />
                    </Button>

                </div>

            </div>

        </aside>
    );
}

function NavigationGroup({
    label,
    items,
}: {
    label: string;
    items: typeof mainNavigation;
}) {
    return (
        <div>

            <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {label}
            </p>

            <div className="space-y-1">

                {items.map((item) => {

                    const Icon = item.icon;

                    const active =
                        item.href === "/";

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                "flex h-9 items-center gap-3 rounded-md px-2.5 text-sm transition-colors",
                                active
                                    ? "bg-accent font-medium text-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            ].join(" ")}
                        >
                            <Icon className="size-4" />

                            <span>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

            </div>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\DashboardTopbar.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\dashboard\EnvironmentBadge.tsx
   ============================================================ */



function EnvironmentBadge() {
    return (
        <Badge
            variant="secondary"
            className="hidden sm:inline-flex"
        >
            <span className="mr-1.5 size-1.5 rounded-full bg-amber-500" />
            Sandbox
        </Badge>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\theme\ThemeToggle.tsx
   ============================================================ */



function ThemeToggle() {
    const {
        theme,
        setTheme,
    } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() =>
                setTheme(
                    theme === "dark"
                        ? "light"
                        : "dark",
                )
            }
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun />
            ) : (
                <Moon />
            )}
        </Button>
    );
}



function DashboardTopbar() {
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

                <ThemeToggle />

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



interface DashboardShellProps {
    children: ReactNode;
}

function DashboardShell({
    children,
}: DashboardShellProps) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar />

            <div className="lg:pl-64">
                <DashboardTopbar />

                <main className="min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\overview\OverviewKpiCard.tsx
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



interface OverviewKpiCardProps {
    title: string;
    value: string;
    description: string;
    trend?: string;
    trendPositive?: boolean;
    icon: LucideIcon;
}

function OverviewKpiCard({
    title,
    value,
    description,
    trend,
    trendPositive,
    icon: Icon,
}: OverviewKpiCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                </div>
            </CardHeader>

            <CardContent>

                <div className="text-2xl font-semibold tracking-tight">
                    {value}
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">

                    {trend && (
                        <span
                            className={
                                trendPositive
                                    ? "font-medium text-emerald-600 dark:text-emerald-400"
                                    : "font-medium text-red-600 dark:text-red-400"
                            }
                        >
                            {trend}
                        </span>
                    )}

                    <span>
                        {description}
                    </span>

                </div>

            </CardContent>
        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\overview\RevenueChart.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\demo\merchantOverviewDemo.ts
   ============================================================ */



const merchantOverviewDemo = {
    monthlyRevenue:
        45231,

    monthlyRevenuePrevious:
        39420,

    billingSuccessRate:
        99.4,

    revenueSeries: [
        {
            label: "Jan",
            value: 21800,
        },
        {
            label: "Feb",
            value: 26100,
        },
        {
            label: "Mar",
            value: 30200,
        },
        {
            label: "Apr",
            value: 34750,
        },
        {
            label: "May",
            value: 39420,
        },
        {
            label: "Jun",
            value: 45231,
        },
    ],
};


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



function RevenueChart() {

    const animatedRevenue =
        useAnimatedNumber(
            appConfig.demoMode
                ? merchantOverviewDemo.monthlyRevenue
                : 0,
        );

    const points =
        merchantOverviewDemo.revenueSeries;

    const width =
        700;

    const height =
        240;

    const padding =
        24;

    const maxValue =
        Math.max(
            ...points.map(
                (point) =>
                    point.value,
            ),
        );

    const minValue =
        Math.min(
            ...points.map(
                (point) =>
                    point.value,
            ),
        );

    const range =
        Math.max(
            maxValue -
                minValue,
            1,
        );

    const coordinates =
        points.map(
            (point, index) => {

                const x =
                    padding +
                    (
                        index /
                        Math.max(
                            points.length -
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
                            point.value -
                            minValue
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
                    `${
                        index === 0
                            ? "M"
                            : "L"
                    } ${point.x} ${point.y}`,
            )
            .join(" ");

    return (
        <Card className="xl:col-span-2">

            <CardHeader>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <CardTitle>
                            Revenue
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Monthly recurring revenue.
                        </p>

                    </div>

                    {appConfig.demoMode && (
                        <Badge variant="outline">
                            Test mode
                        </Badge>
                    )}

                </div>

                <div className="pt-3">

                    <p className="text-3xl font-semibold tracking-tight">
                        $
                        {Math.round(
                            animatedRevenue,
                        ).toLocaleString()}
                    </p>

                </div>

            </CardHeader>

            <CardContent>

                <div className="overflow-hidden rounded-xl border bg-muted/20 p-3">

                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        className="h-[240px] w-full"
                        role="img"
                        aria-label="Revenue trend"
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
                                    r="4"
                                    className="fill-primary"
                                />
                            ),
                        )}

                    </svg>

                    <div className="grid grid-cols-6 gap-2 px-2 pb-1">

                        {points.map(
                            (
                                point,
                            ) => (
                                <p
                                    key={
                                        point.label
                                    }
                                    className="text-center text-[10px] text-muted-foreground"
                                >
                                    {
                                        point.label
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
   FLATTENED SOURCE: components\dashboard\platform\overview\SubscriptionChart.tsx
   ============================================================ */



const values = [
    1020,
    1110,
    1190,
    1280,
    1350,
    1420,
    1510,
    1610,
    1700,
    1780,
    1840,
    1892,
];

function SubscriptionChart() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Subscriptions
                </CardTitle>

                <CardDescription>
                    Active subscriptions over time.
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="flex h-48 items-end gap-1.5">

                    {values.map(
                        (value, index) => {

                            const height =
                                `${(value / 1892) * 100}%`;

                            return (
                                <div
                                    key={index}
                                    className="flex h-full flex-1 items-end"
                                >
                                    <div
                                        className="w-full rounded-t-sm bg-secondary-foreground/70"
                                        style={{
                                            height,
                                        }}
                                    />
                                </div>
                            );
                        },
                    )}

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\overview\CustomerChart.tsx
   ============================================================ */



function CustomerChart() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Customers
                </CardTitle>

                <CardDescription>
                    Customer growth this year.
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="relative h-48">

                    <div className="absolute inset-x-0 top-0 border-t border-dashed" />
                    <div className="absolute inset-x-0 top-1/4 border-t border-dashed" />
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed" />
                    <div className="absolute inset-x-0 top-3/4 border-t border-dashed" />
                    <div className="absolute inset-x-0 bottom-0 border-t" />

                    <div className="absolute inset-0 flex items-end">

                        {[25, 31, 35, 42, 49, 55, 63, 70, 77, 84, 92, 100].map(
                            (height, index) => (
                                <div
                                    key={index}
                                    className="flex h-full flex-1 items-end px-0.5"
                                >
                                    <div
                                        className="w-full rounded-t bg-primary/30 transition-colors hover:bg-primary/60"
                                        style={{
                                            height: `${height}%`,
                                        }}
                                    />
                                </div>
                            ),
                        )}

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\overview\InfrastructureHealth.tsx
   ============================================================ */



const services = [
    {
        name: "Billing API",
        status: "Operational",
        latency: "124 ms",
        icon: Server,
    },
    {
        name: "Blockchain RPC",
        status: "Operational",
        latency: "186 ms",
        icon: Activity,
    },
    {
        name: "Database",
        status: "Operational",
        latency: "42 ms",
        icon: Database,
    },
    {
        name: "Billing worker",
        status: "Operational",
        latency: "99.98%",
        icon: Clock3,
    },
];

function InfrastructureHealth() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Infrastructure
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {services.map((service) => {

                    const Icon = service.icon;

                    return (
                        <div
                            key={service.name}
                            className="flex items-center gap-3"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                                <Icon className="size-4 text-muted-foreground" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {service.name}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {service.latency}
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="gap-1"
                            >
                                <CheckCircle2 className="size-3 text-emerald-500" />
                                Operational
                            </Badge>
                        </div>
                    );
                })}

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\overview\ActivityFeed.tsx
   ============================================================ */



const activity = [
    {
        title: "New customer created",
        description: "Customer smart account registered.",
        time: "4 minutes ago",
        icon: UserPlus,
    },
    {
        title: "Subscription activated",
        description: "Pro subscription activated.",
        time: "18 minutes ago",
        icon: CreditCard,
    },
    {
        title: "Smart account funded",
        description: "Customer wallet received funds.",
        time: "31 minutes ago",
        icon: Wallet,
    },
];

function ActivityFeed() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent activity
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="space-y-5">

                    {activity.map((item) => {

                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex gap-3"
                            >

                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                    <Icon className="size-4 text-muted-foreground" />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.time}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\overview\QuickActions.tsx
   ============================================================ */



function QuickActions() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Quick actions
                </CardTitle>

                <CardDescription>
                    Common merchant operations.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">

                <Button>
                    <Plus />
                    Create plan
                </Button>

                <Button variant="outline">
                    <KeyRound />
                    Create API key
                </Button>

                <Button variant="outline">
                    <Webhook />
                    Configure webhook
                </Button>

            </CardContent>

        </Card>
    );
}



function Home() {
    return (

            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        {/* PAGE HEADER */}

                        <PageHeader
                            eyebrow="Merchant overview"
                            title="Good morning, ACMEFLOW."
                            description="Monitor your billing infrastructure, customers, subscriptions, and revenue from one place."
                            actions={
                                <Inline gap={2}>
                                    <Button variant="outline">
                                        Documentation
                                    </Button>

                                    <Button>
                                        Create plan
                                    </Button>
                                </Inline>
                            }
                        />

                        <Divider />

                        {/* KPI */}

                        <Section
                            title="Overview"
                            description="A real-time summary of your merchant account."
                        >

                            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                <OverviewKpiCard
                                    title="Customers"
                                    value="2,431"
                                    description="from last month"
                                    trend="+12.4%"
                                    trendPositive
                                    icon={Users}
                                />

                                <OverviewKpiCard
                                    title="Active subscriptions"
                                    value="1,892"
                                    description="from last month"
                                    trend="+8.2%"
                                    trendPositive
                                    icon={CreditCard}
                                />

                                <OverviewKpiCard
                                    title="Monthly revenue"
                                    value="$45,231"
                                    description="from last month"
                                    trend="+14.8%"
                                    trendPositive
                                    icon={CircleDollarSign}
                                />

                                <OverviewKpiCard
                                    title="Billing success"
                                    value="99.4%"
                                    description="last 30 days"
                                    trend="+0.7%"
                                    trendPositive
                                    icon={Activity}
                                />

                            </Grid>

                        </Section>

                        {/* REVENUE */}

                        <Section
                            title="Revenue"
                            description="Track recurring billing performance."
                        >

                            <Grid className="grid-cols-1 xl:grid-cols-3">

                                <RevenueChart />

                                <CardPlaceholderSummary />

                            </Grid>

                        </Section>

                        {/* OPERATIONS */}

                        <Section
                            title="Operations"
                            description="Understand customer and subscription activity."
                        >

                            <Grid className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

                                <SubscriptionChart />

                                <CustomerChart />

                                <InfrastructureHealth />

                            </Grid>

                        </Section>

                        {/* ACTIVITY */}

                        <Section
                            title="Activity"
                            description="Recent events across your merchant infrastructure."
                        >

                            <Grid className="grid-cols-1 lg:grid-cols-2">

                                <ActivityFeed />

                                <QuickActions />

                            </Grid>

                        </Section>

                        {/* FOOTER STATUS */}

                        <div className="flex flex-col gap-3 rounded-lg border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <p className="text-sm font-medium">
                                    Billing infrastructure operational
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    All monitored services are currently healthy.
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="w-fit"
                            >
                                Operational
                            </Badge>

                        </div>

                    </Stack>

                </Container>

            </Page>
    );
}

function CardPlaceholderSummary() {
    return (
        <div className="flex flex-col justify-between rounded-xl border bg-card p-6 xl:col-span-1">

            <div>

                <p className="text-sm font-medium text-muted-foreground">
                    Revenue this month
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight">
                    $45,231.00
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    Your recurring revenue has increased steadily over the last several months.
                </p>

            </div>

            <div className="mt-8 space-y-4">

                <MetricRow
                    label="Recurring revenue"
                    value="$42,780"
                />

                <MetricRow
                    label="One-time revenue"
                    value="$2,451"
                />

                <MetricRow
                    label="Refunds"
                    value="$312"
                />

            </div>

        </div>
    );
}

function MetricRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-medium">
                {value}
            </span>

        </div>
    );
}
