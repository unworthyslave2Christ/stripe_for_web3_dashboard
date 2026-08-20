import Link from "next/link";
import * as React from "react"

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"


import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"


import {
    Bell,
    CreditCard,
    LayoutDashboard,
    LockKeyhole,
    Receipt,
    Settings,
    WalletCards,
    ArrowUpDown
} from "lucide-react";
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cva, type VariantProps } from "class-variance-authority"


import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"


/* ============================================================
   FLATTENED SOURCE: app\portal\layout.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\portal\CustomerPortalShell.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\portal\CustomerPortalSidebar.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\avatar.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\utils.ts
   ============================================================ */



function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



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


/* ============================================================
   FLATTENED SOURCE: components\portal\CustomerPortalNavigation.tsx
   ============================================================ */



const navigation = [
    {
        label: "Overview",
        href: "/portal",
        icon: LayoutDashboard,
    },
    {
        label: "Smart Account",
        href: "/portal/smart-account",
        icon: WalletCards,
    },
    {
        label: "Subscriptions",
        href: "/portal/subscriptions",
        icon: CreditCard,
    },
    {
        label: "Billing",
        href: "/portal/billing",
        icon: Receipt,
    },
    {
        label: "Permissions",
        href: "/portal/permissions",
        icon: LockKeyhole,
    },
    {
        label: "Transactions",
        href: "/portal/transactions",
        icon: ArrowUpDown,
    },
    {
        label: "Notifications",
        href: "/portal/notifications",
        icon: Bell,
    },
    {
        label: "Settings",
        href: "/portal/settings",
        icon: Settings,
    },
];

function CustomerPortalNavigation() {
    return (
        <nav className="space-y-1">

            {navigation.map((item) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Icon className="size-4" />

                        <span>
                            {item.label}
                        </span>
                    </Link>
                );
            })}

        </nav>
    );
}



function CustomerPortalSidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r bg-card lg:flex lg:flex-col">

            {/* BRAND */}

            <div className="flex h-16 items-center px-5">

                <Link
                    href="/portal"
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

            {/* CUSTOMER */}

            <div className="p-3">

                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">

                    <Avatar className="size-8">

                        <AvatarFallback>
                            AJ
                        </AvatarFallback>

                    </Avatar>

                    <div className="min-w-0">

                        <p className="truncate text-sm font-medium">
                            Alex Johnson
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            Customer portal
                        </p>

                    </div>

                </div>

            </div>

            <div className="flex-1 overflow-y-auto px-3">

                <CustomerPortalNavigation />

            </div>

            <Separator />

            <div className="p-3">

                <p className="px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Powered by
                </p>

                <p className="mt-1 px-2 text-sm font-medium">
                    Stripe for Web3
                </p>

            </div>

        </aside>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\portal\CustomerPortalTopbar.tsx
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


/* ============================================================
   FLATTENED SOURCE: components\portal\CustomerPortalWalletButton.tsx
   ============================================================ */



function CustomerPortalWalletButton() {
    return (
        <Button
            variant="outline"
            size="sm"
        >
            <WalletCards />

            <span className="hidden sm:inline">
                0x742d...f44e
            </span>

            <span className="sm:hidden">
                Wallet
            </span>
        </Button>
    );
}



function CustomerPortalTopbar() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-6">

            <div className="flex items-center gap-3">

                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open navigation"
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



interface CustomerPortalShellProps {
    children: React.ReactNode;
}

function CustomerPortalShell({
    children,
}: CustomerPortalShellProps) {
    return (
        <div className="min-h-screen bg-background">

            <CustomerPortalSidebar />

            <div className="lg:pl-60">

                <CustomerPortalTopbar />

                <main>
                    {children}
                </main>

            </div>

        </div>
    );
}



function CustomerPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CustomerPortalShell>
            {children}
        </CustomerPortalShell>
    );
}
