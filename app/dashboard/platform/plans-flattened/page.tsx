"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cva, type VariantProps } from "class-variance-authority"


import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import type { ReactNode } from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"


import {
    Archive,
    CircleDollarSign,
    Layers3,
    Users,
} from "lucide-react";
import type { PlanRecord } from "@stripe-for-web3/core";
import Link from "next/link";
import { Menu as MenuPrimitive } from "@base-ui/react/menu"


import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import {
    usePrivy,
} from "@privy-io/react-auth";
import {
    useAccount,
} from "wagmi";
import type {
    PublicClient,
    WalletClient,
} from "viem";
import {
    MerchantClient,
} from "@stripe-for-web3/merchant";
import { Input as InputPrimitive } from "@base-ui/react/input"


import { Select as SelectPrimitive } from "@base-ui/react/select"



/* ============================================================
   FLATTENED SOURCE: app\dashboard\platform\plans\page.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\button.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\utils.ts
   ============================================================ */



function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



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
   FLATTENED SOURCE: components\dashboard\platform\plans\PlansOverview.tsx
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
   FLATTENED SOURCE: components\dashboard\platform\plans\PlanKpiCard.tsx
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



interface PlanKpiCardProps {
    title: string;

    value: string;

    description: string;

    icon: LucideIcon;
}

function PlanKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: PlanKpiCardProps) {
    return (
        <Card className="p-5">

            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                        {value}
                    </p>
                </div>

                <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="size-4 text-muted-foreground" />
                </div>

            </div>

            <p className="mt-4 text-xs text-muted-foreground">
                {description}
            </p>

        </Card>
    );
}



interface PlansOverviewProps {
    summary: {
        total: number;

        active: number;

        paused: number;

        archived: number;

        monthlyRevenue: number;
    };
}

function PlansOverview({
    summary,
}: PlansOverviewProps) {
    return (
        <Section
            title="Overview"
            description="A summary of the billing plans offered by your merchant."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PlanKpiCard
                    title="Total plans"
                    value={
                        summary.total.toLocaleString()
                    }
                    description="All plans returned by the API"
                    icon={Layers3}
                />

                <PlanKpiCard
                    title="Active plans"
                    value={
                        summary.active.toLocaleString()
                    }
                    description="Currently available"
                    icon={Users}
                />

                <PlanKpiCard
                    title="Plan revenue"
                    value={
                        `$${summary.monthlyRevenue.toLocaleString(
                            undefined,
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            },
                        )}`
                    }
                    description="Current monthly revenue"
                    icon={CircleDollarSign}
                />

                <PlanKpiCard
                    title="Archived plans"
                    value={
                        summary.archived.toLocaleString()
                    }
                    description="No longer offered"
                    icon={Archive}
                />

            </Grid>
        </Section>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlansPagination.tsx
   ============================================================ */



function PlansPagination({
    total,
    page,
    pageSize,
    onPageChange,
}: {
    total: number;

    page: number;

    pageSize: number;

    onPageChange: (
        page: number,
    ) => void;
}) {
    const pageCount =
        Math.max(
            Math.ceil(
                total /
                    pageSize,
            ),
            1,
        );

    const start =
        total === 0
            ? 0
            : (
                (
                    page -
                    1
                ) *
                    pageSize
            ) + 1;

    const end =
        Math.min(
            page *
                pageSize,
            total,
        );

    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing {start}–{end} of {total} plans
            </p>

            <div className="flex items-center gap-1">

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        page <= 1
                    }
                    onClick={() =>
                        onPageChange(
                            page - 1,
                        )
                    }
                >
                    <ChevronLeft />
                </Button>

                {Array.from({
                    length: pageCount,
                })
                    .slice(0, 5)
                    .map(
                        (_, index) => {
                            const pageNumber =
                                index +
                                1;

                            return (
                                <Button
                                    key={
                                        pageNumber
                                    }
                                    variant={
                                        pageNumber ===
                                        page
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="size-8"
                                    onClick={() =>
                                        onPageChange(
                                            pageNumber,
                                        )
                                    }
                                >
                                    {
                                        pageNumber
                                    }
                                </Button>
                            );
                        },
                    )}

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        page >=
                        pageCount
                    }
                    onClick={() =>
                        onPageChange(
                            page + 1,
                        )
                    }
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlansTable.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlanTableRow.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\dropdown-menu.tsx
   ============================================================ */



function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlanStatusBadge.tsx
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



interface PlanStatusBadgeProps {
    status: PlanRecord["status"];
}

function PlanStatusBadge({
    status,
}: PlanStatusBadgeProps) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "PAUSED":
            return (
                <Badge variant="outline">
                    Paused
                </Badge>
            );

        case "ARCHIVED":
            return (
                <Badge variant="destructive">
                    Archived
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    {String(status)}
                </Badge>
            );
    }
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlanPricing.tsx
   ============================================================ */



function formatInterval(
    interval: PlanRecord["billingPeriodNamed"],
) {
    switch (String(interval)) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "MONTH":
            return "month";

        case "YEAR":
            return "year";

        default:
            return String(interval).toLowerCase();
    }
}

interface PlanPricingProps {
    plan: PlanRecord;
}

function PlanPricing({
    plan,
}: PlanPricingProps) {
    return (
        <div>
            <p className="font-medium">
                {plan.amount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
                / {formatInterval(
                    plan.billingPeriodNamed,
                )}

                {" · "}

                {plan.paymentToken}
            </p>
        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: hooks\merchant\useMerchantPlanActions.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: lib\query\queryKeys.ts
   ============================================================ */



const queryKeys = {
    customer: {
        all:
            ["customer"] as const,

        byWallet: (
            wallet: string,
        ) => [
            "customer",
            "wallet",
            wallet,
        ] as const,

        byId: (
            customerId: number | string,
        ) => [
            "customer",
            "id",
            customerId,
        ] as const,

        subscriptions: (
            customerId: number | string,
        ) => [
            "customer",
            "subscriptions",
            customerId,
        ] as const,

        subscription: (
            subscriptionId: number,
        ) => [
            "customer",
            "subscription",
            subscriptionId,
        ] as const,

        plan: (
            planId: number,
        ) => [
            "customer",
            "plan",
            planId,
        ] as const,
    },

    merchant: {
        all:
            ["merchant"] as const,

        byOwnerWallet: (
            wallet: string,
        ) => [
            "merchant",
            "owner-wallet",
            wallet,
        ] as const,

        byId: (
            merchantId: number | string,
        ) => [
            "merchant",
            "id",
            merchantId,
        ] as const,

        plans: (
            merchantId: number | string,
        ) => [
            "merchant",
            "plans",
            merchantId,
        ] as const,

        plan: (planId: number) =>
            [
                "merchant",
                "plan",
                planId,
            ] as const,

        customers: (
            merchantId: number | string,
            params: {
                page: number;
                pageSize: number;
                search: string;
                status: string;
            },
        ) => [
            "merchant",
            "customers",
            merchantId,
            params,
        ] as const,

        notifications: (
            merchantId: number,
        ) => [
            "merchant",
            merchantId,
            "notifications",
        ] as const,
    },
} as const;


/* ============================================================
   FLATTENED SOURCE: hooks\merchant\useMerchant.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: hooks\merchant\useMerchantClient.ts
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



function createMerchantClient({
    walletClient,
    publicClient,
}: {
    walletClient: WalletClient;
    publicClient: PublicClient;
}) {
    return new MerchantClient({
        walletClient,
        publicClient,
        contractAddress:
            appConfig.billingContractAddress,
        apiUrl:
            appConfig.apiUrl,
    });
}

function useMerchantClient() {
    const {
        isConnected,
        address,
    } = useAccount();

    const {
        data: walletClient,
    } = useWalletClient();

    const publicClient =
        usePublicClient();

    const connected =
        Boolean(
            isConnected &&
            address,
        );

    const client =
        useMemo(() => {
            if (
                !connected ||
                !walletClient ||
                !publicClient
            ) {
                return null;
            }

            return createMerchantClient({
                walletClient,
                publicClient,
            });
        }, [
            connected,
            walletClient,
            publicClient,
        ]);

    return {
        client,

        walletClient,

        publicClient,

        connected,

        ready:
            Boolean(
                connected &&
                walletClient &&
                publicClient,
            ),
    };
}



type MerchantResourceStatus =
    | "disconnected"
    | "waiting"
    | "loading"
    | "ready"
    | "not-created"
    | "error";

function isNotFoundError(error: unknown) {
    if (!error) {
        return false;
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "status" in error
    ) {
        return (
            (error as { status?: number }).status === 404
        );
    }

    return false;
}

function useMerchant() {
    const {
        ready: privyReady,
        authenticated,
    } = usePrivy();

    const {
        address,
        isConnected,
    } = useAccount();

    const {
        client,
        ready: clientReady,
    } = useMerchantClient();

    // const walletConnected =
    //     Boolean(
    //         privyReady &&
    //         authenticated &&
    //         isConnected &&
    //         address,
    //     );

    const walletConnected =
        Boolean(
            privyReady &&
            isConnected &&
            address,
        );

    const query =
        useQuery({
            queryKey:
                walletConnected && address
                    ? queryKeys.merchant.byOwnerWallet(
                        address,
                    )
                    : queryKeys.merchant.all,

            queryFn:
                async () => {
                    if (!client) {
                        throw new Error(
                            "Merchant client is not ready.",
                        );
                    }

                    if (!address) {
                        throw new Error(
                            "Merchant wallet is not connected.",
                        );
                    }

                    return client.getByOwnerWallet(
                        address,
                    );
                },

            enabled:
                Boolean(
                    walletConnected &&
                    clientReady,
                ),

            retry: false,
        });

    let merchantStatus:
        MerchantResourceStatus;

    console.log("!walletConnected: ", !walletConnected);
    console.log("privyReady: ", privyReady);
    console.log("authenticated: ", authenticated);

    if (!walletConnected) {
        merchantStatus =
            "disconnected";
    } else if (!clientReady) {
        merchantStatus =
            "waiting";
    } else if (query.isLoading) {
        merchantStatus =
            "loading";
    } else if (
        query.isError &&
        isNotFoundError(query.error)
    ) {
        merchantStatus = "not-created";
    } else if (query.isError) {
        merchantStatus = "error";
    } else if (query.data) {
        merchantStatus = "ready";
    } else {
        merchantStatus = "not-created";
    }

    return {
        merchant:
            walletConnected
                ? query.data ?? null
                : null,

        merchantStatus,

        ownerWallet:
            walletConnected
                ? address
                : undefined,

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



function useMerchantPlanActions(
    planId: number,
) {
    const queryClient =
        useQueryClient();

    const {
        merchant,
    } = useMerchant();

    const {
        client,
        ready,
    } =
        useMerchantClient();

    const merchantId =
        merchant?.merchantId ?? null;

    const mutation =
        useMutation({
            mutationFn:
                async (
                    action:
                        | "activate"
                        | "pause"
                        | "archive",
                ) => {
                    if (!ready || !client) {
                        throw new Error(
                            "Merchant client is not ready.",
                        );
                    }

                    if (
                        merchantId === null
                    ) {
                        throw new Error(
                            "Merchant account is not available.",
                        );
                    }

                    switch (action) {
                        case "activate":
                            return client.activatePlan(
                                planId,
                            );

                        case "pause":
                            return client.pausePlan(
                                planId,
                            );

                        case "archive":
                            return client.archivePlan(
                                planId,
                            );
                    }
                },

            onSuccess:
                async () => {
                    if (
                        merchantId ===
                        null
                    ) {
                        return;
                    }

                    await Promise.all([
                        queryClient.invalidateQueries({
                            queryKey:
                                queryKeys.merchant.plans(
                                    merchantId,
                                ),
                        }),

                        queryClient.invalidateQueries({
                            queryKey:
                                queryKeys.merchant.plan(
                                    planId,
                                ),
                        }),
                    ]);
                },
        });

    return {
        activate:
            () =>
                mutation.mutateAsync(
                    "activate",
                ),

        pause:
            () =>
                mutation.mutateAsync(
                    "pause",
                ),

        archive:
            () =>
                mutation.mutateAsync(
                    "archive",
                ),

        pending:
            mutation.isPending,

        error:
            mutation.error instanceof Error
                ? mutation.error
                : null,

        reset:
            mutation.reset,
    };
}



interface PlanTableRowProps {
    plan: PlanRecord;
}

function PlanTableRow({
    plan,
}: PlanTableRowProps) {
    const {
        activate,
        pause,
        archive,
        pending,
    } = useMerchantPlanActions(plan.planId);

    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">
            <td className="px-4 py-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                        <Layers3 className="size-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                        <Link
                            href={`/dashboard/merchant/plans/${plan.planId}`}
                            className="block truncate text-sm font-medium hover:underline"
                        >
                            {plan.name}
                        </Link>

                        <p className="truncate text-xs text-muted-foreground">
                            Plan #{plan.planId}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-4 py-4">
                <PlanPricing plan={plan} />
            </td>

            {/* <td className="px-4 py-4 text-sm">
                {plan.activeSubscribers}
            </td>

            <td className="px-4 py-4 text-sm">
                {plan.monthlyRevenue}
            </td> */}

            <td className="px-4 py-4">
                <PlanStatusBadge status={plan.status} />
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {new Date(plan.createdAt).toLocaleDateString()}
            </td>

            <td className="px-4 py-4 text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                disabled={pending}
                                aria-label={`Actions for ${plan.name}`}
                            >
                                <MoreHorizontal />
                            </Button>
                        }
                    />

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            render={
                                <Link
                                    href={`/dashboard/merchant/plans/${plan.planId}`}
                                >
                                    View plan
                                </Link>
                            }
                        />

                        <DropdownMenuItem
                            render={
                                <Link
                                    href={`/dashboard/merchant/plans/${plan.planId}/edit`}
                                >
                                    Edit plan
                                </Link>
                            }
                        />

                        <DropdownMenuSeparator />

                        {plan.status === "ACTIVE" && (
                            <DropdownMenuItem
                                disabled={pending}
                                onClick={() => {
                                    void pause();
                                }}
                            >
                                <Pause />
                                Pause plan
                            </DropdownMenuItem>
                        )}

                        {plan.status === "PAUSED" && (
                            <DropdownMenuItem
                                disabled={pending}
                                onClick={() => {
                                    void activate();
                                }}
                            >
                                <Check />
                                Activate plan
                            </DropdownMenuItem>
                        )}

                        {plan.status !== "ARCHIVED" && (
                            <>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={pending}
                                    onClick={() => {
                                        void archive();
                                    }}
                                >
                                    <Archive />
                                    Archive plan
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>
        </tr>
    );
}



interface PlansTableProps {
    plans: PlanRecord[];
}

function PlansTable({
    plans,
}: PlansTableProps) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Plan
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Price
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Subscribers
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Monthly revenue
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Created
                                </th>

                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {plans.map(
                                (plan) => (
                                    <PlanTableRow
                                        key={
                                            plan.planId
                                        }
                                        plan={
                                            plan
                                        }
                                    />
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlansToolbar.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlansSearch.tsx
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



function PlansSearch({
    value,
    onChange,
}: {
    value: string;

    onChange: (
        value: string,
    ) => void;
}) {
    return (
        <div className="relative w-full sm:w-72">

            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value,
                    )
                }
                placeholder="Search plans..."
                className="pl-9"
            />

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlanActions.tsx
   ============================================================ */



interface PlanActionsProps {
    refreshing: boolean;
    onRefresh: () => void;
}

function PlanActions({
    refreshing,
    onRefresh,
}: PlanActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled
            >
                <Download />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={refreshing}
            >
                <RefreshCw
                    className={
                        refreshing
                            ? "animate-spin"
                            : undefined
                    }
                />

                {refreshing
                    ? "Refreshing"
                    : "Refresh"}
            </Button>

            <Button
                size="sm"
                render={
                    <Link href="/dashboard/merchant/plans/create">
                        <Plus />
                        Create plan
                    </Link>
                }
            />
        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\PlanFilters.tsx
   ============================================================ */


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


/* ============================================================
   FLATTENED SOURCE: components\dashboard\platform\plans\plan.types.ts
   ============================================================ */



type PlanStatus =
    | "ACTIVE"
    | "PAUSED"
    | "ARCHIVED";

type BillingInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

interface PlanRecord {
    id: string;

    planId: number;

    name: string;

    description: string;

    amount: string;

    currency: string;

    billingInterval: BillingInterval;

    merchantId: number;

    paymentToken: string;

    status: PlanStatus;

    activeSubscribers: number;

    totalSubscribers: number;

    cancelledSubscriptions?: number;

    monthlyRevenue: string;

    lifetimeRevenue?: string;

    createdAt: string;
}



function PlanFilters({
    status,
    interval,
    onStatusChange,
    onIntervalChange,
}: {
    status:
        | "ALL"
        | PlanStatus;

    interval:
        | "ALL"
        | BillingInterval;

    onStatusChange: (
        value:
            | "ALL"
            | PlanStatus,
    ) => void;

    onIntervalChange: (
        value:
            | "ALL"
            | BillingInterval,
    ) => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select
                value={status}
                onValueChange={(
                    value,
                ) =>
                    onStatusChange(
                        value as
                            | "ALL"
                            | PlanStatus,
                    )
                }
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="ALL">
                        All plans
                    </SelectItem>

                    <SelectItem value="ACTIVE">
                        Active
                    </SelectItem>

                    <SelectItem value="PAUSED">
                        Paused
                    </SelectItem>

                    <SelectItem value="ARCHIVED">
                        Archived
                    </SelectItem>

                </SelectContent>

            </Select>

            <Select
                value={interval}
                onValueChange={(
                    value,
                ) =>
                    onIntervalChange(
                        value as
                            | "ALL"
                            | BillingInterval,
                    )
                }
            >

                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Interval" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="ALL">
                        All intervals
                    </SelectItem>

                    <SelectItem value="MONTH">
                        Monthly
                    </SelectItem>

                    <SelectItem value="YEAR">
                        Yearly
                    </SelectItem>

                    <SelectItem value="WEEK">
                        Weekly
                    </SelectItem>

                    <SelectItem value="DAY">
                        Daily
                    </SelectItem>

                </SelectContent>

            </Select>

            <Button
                variant="outline"
                size="sm"
                disabled
            >
                <SlidersHorizontal />
                More filters
            </Button>

        </div>
    );
}



function PlansToolbar({
    search,
    status,
    interval,
    refreshing,
    onSearchChange,
    onStatusChange,
    onIntervalChange,
    onRefresh,
}: {
    search: string;

    status:
        | "ALL"
        | PlanStatus;

    interval:
        | "ALL"
        | BillingInterval;

    refreshing: boolean;

    onSearchChange: (
        value: string,
    ) => void;

    onStatusChange: (
        value:
            | "ALL"
            | PlanStatus,
    ) => void;

    onIntervalChange: (
        value:
            | "ALL"
            | BillingInterval,
    ) => void;

    onRefresh: () => void;
}) {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <PlansSearch
                        value={search}
                        onChange={
                            onSearchChange
                        }
                    />

                    <PlanActions
                        refreshing={
                            refreshing
                        }
                        onRefresh={
                            onRefresh
                        }
                    />

                </div>

                <PlanFilters
                    status={status}
                    interval={interval}
                    onStatusChange={
                        onStatusChange
                    }
                    onIntervalChange={
                        onIntervalChange
                    }
                />

            </Stack>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: hooks\pages\merchant\useMerchantPlansPage.ts
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: hooks\merchant\useMerchantPlans.ts
   ============================================================ */



function useMerchantPlans() {

    
    const {
        merchant,
        merchantStatus,
    } =
        useMerchant();

    const {
        client,
    } =
        useMerchantClient();

    const merchantId =
        merchant?.merchantId ??
        null;

    const query =
        useQuery({
            queryKey:
                merchantId !== null
                    ? queryKeys.merchant.plans(
                        merchantId,
                    )
                    : [
                        "merchant",
                        "plans",
                        "none",
                    ],

            queryFn:
                async () => {
                    if (!client) {
                        throw new Error(
                            "Merchant client is not ready.",
                        );
                    }

                    if (
                        merchantId ===
                        null
                    ) {
                        return [];
                    }

                    return client.getPlans(
                        merchantId,
                    );
                },

            enabled:
                Boolean(
                    client &&
                    merchantId !== null &&
                    merchantStatus ===
                        "ready",
                ),

            retry:
                false,
        });

    return {
        plans:
            query.data ??
            [],

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



const PAGE_SIZE = 10;

function useMerchantPlansPage() {
    ////////////////////////////////////////////////////////////
    // RESOURCES
    ////////////////////////////////////////////////////////////

    const merchant =
        useMerchant();

    const plans =
        useMerchantPlans();

    const {
        client,
        ready: clientReady,
    } = useMerchantClient();

    const pausePlan = useMutation({
        mutationFn: async (
            plan: PlanRecord,
        ) => {
            if (!client) {
                throw new Error(
                    "Merchant client is not ready.",
                );
            }

            return client.pausePlan(
                plan,
            );
        },

        onSuccess: async () => {
            await plans.refresh();
        },
    });

    const activatePlan = useMutation({
        mutationFn: async (
            plan: PlanRecord,
        ) => {
            if (!client) {
                throw new Error(
                    "Merchant client is not ready.",
                );
            }

            return client.resumePlan(
                plan,
            );
        },

        onSuccess: async () => {
            await plans.refresh();
        },
    });

    const archivePlan = useMutation({
        mutationFn: async (
            plan: PlanRecord,
        ) => {
            if (!client) {
                throw new Error(
                    "Merchant client is not ready.",
                );
            }

            return client.archivePlan(
                plan,
            );
        },

        onSuccess: async () => {
            await plans.refresh();
        },
    });
        

    ////////////////////////////////////////////////////////////
    // UI STATE
    ////////////////////////////////////////////////////////////

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] =
        useState<
            "ALL" |
            PlanStatus
        >("ALL");

    const [
        intervalFilter,
        setIntervalFilter,
    ] =
        useState<
            "ALL" |
            BillingInterval
        >("ALL");

    const [
        page,
        setPage,
    ] = useState(1);

    ////////////////////////////////////////////////////////////
    // FILTERING
    ////////////////////////////////////////////////////////////

    const filteredPlans =
        useMemo(() => {
            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return plans.plans.filter(
                (plan) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        plan.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        // plan.description
                        //     .toLowerCase()
                        //     .includes(
                        //         normalizedSearch,
                        //     ) ||
                        String(
                            plan.planId,
                        ).includes(
                            normalizedSearch,
                        ); // TODO: To remove searching by plan Ids to prevent merchants from having read-only unauthorized access to other merchant's plans, perhaps this Gating is to be achieved via API keys

                    const matchesStatus =
                        statusFilter ===
                            "ALL" ||
                        plan.status ===
                            statusFilter;

                    const matchesInterval =
                        intervalFilter ===
                            "ALL" ||
                        plan.billingPeriodNamed as string ===
                            intervalFilter;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesInterval
                    );
                },
            );
        }, [
            plans.plans,
            search,
            statusFilter,
            intervalFilter,
        ]);

    ////////////////////////////////////////////////////////////
    // RESET PAGE WHEN FILTER CHANGES
    ////////////////////////////////////////////////////////////

    const setSearchValue =
        (
            value: string,
        ) => {
            setSearch(
                value,
            );
            setPage(1);
        };

    const setStatus =
        (
            value:
                | "ALL"
                | PlanStatus,
        ) => {
            setStatusFilter(
                value,
            );
            setPage(1);
        };

    const setInterval =
        (
            value:
                | "ALL"
                | BillingInterval,
        ) => {
            setIntervalFilter(
                value,
            );
            setPage(1);
        };

    ////////////////////////////////////////////////////////////
    // PAGINATION
    ////////////////////////////////////////////////////////////

    const paginatedPlans =
        useMemo(() => {
            const start =
                (
                    page -
                    1
                ) *
                    PAGE_SIZE;
        
            return filteredPlans.slice(
                start,
                start +
                    PAGE_SIZE,
            );
        }, [
            filteredPlans,
            page,
        ]);

    ////////////////////////////////////////////////////////////
    // KEEP CURRENT PAGE VALID
    ////////////////////////////////////////////////////////////

    const pageCount =
        Math.max(
            Math.ceil(
                filteredPlans.length /
                    PAGE_SIZE,
            ),
            1,
        );

    useEffect(() => {
        if (
            page >
            pageCount
        ) {
            setPage(
                pageCount,
            );
        }
    }, [
        page,
        pageCount,
    ]);

    ////////////////////////////////////////////////////////////
    // SUMMARY
    ////////////////////////////////////////////////////////////

    const summary =
        useMemo(() => {
            const items =
                plans.plans;

            return {
                total:
                    items.length,

                active:
                    items.filter(
                        (plan) =>
                            plan.status ===
                            "ACTIVE",
                    ).length,

                paused:
                    items.filter(
                        (plan) =>
                            plan.status ===
                            "PAUSED",
                    ).length,

                archived:
                    items.filter(
                        (plan) =>
                            plan.status ===
                            "ARCHIVED",
                    ).length,

                monthlyRevenue:
                    items.reduce(
                        (
                            total,
                            plan,
                        ) =>
                            total +
                            Number(
                                // plan.monthlyRevenue.replace(
                                //     /[^0-9.-]+/g,
                                //     "",
                                // ) ||
                                0,
                            ),

                            // TODO: Every time a charge is executed(during billing),  a monthlyRevenue column (yet unadded) has on each plan an automated increment during billing
                        0,
                    ),
            };
        }, [
            plans.plans,
        ]);

    return {
        merchant: {
            data:
                merchant.merchant,

            status:
                merchant.merchantStatus,

            ownerWallet:
                merchant.ownerWallet,

            loading:
                merchant.loading,

            refreshing:
                merchant.refreshing,

            error:
                merchant.error,

            refresh:
                merchant.refresh,
        },

        plans: {
            data:
                paginatedPlans,

            filteredCount:
                filteredPlans.length,

            loading:
                plans.loading,

            refreshing:
                plans.refreshing,

            error:
                plans.error,

            refresh:
                plans.refresh,
        },

        summary,

        filters: {
            search,

            status:
                statusFilter,

            interval:
                intervalFilter,

            page,

            pageSize:
                PAGE_SIZE,

            setSearch:
                setSearchValue,

            setStatus,

            setInterval,

            setPage,
        },

        loading:
            merchant.loading ||
            (
                merchant.merchantStatus ===
                    "ready" &&
                plans.loading
            ),

        refreshing:
            merchant.refreshing ||
            plans.refreshing,

        error:
            merchant.error ??
            plans.error,

        planActions: {
            pause: pausePlan.mutate,
            activate: activatePlan.mutate,
            archive: archivePlan.mutate,

            pending:
                pausePlan.isPending ||
                activatePlan.isPending ||
                archivePlan.isPending,
        },
    };
}



function PlansLoadingState() {
    return (
        <div className="space-y-4">

            {Array.from({
                length: 4,
            }).map((_, index) => (
                <div
                    key={index}
                    className="h-16 animate-pulse rounded-xl bg-muted"
                />
            ))}

        </div>
    );
}

function PlansErrorState({
    error,
    onRetry,
}: {
    error: Error;
    onRetry: () => void;
}) {
    return (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">

            <p className="font-medium">
                Unable to load plans
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
                {error.message}
            </p>

            <Button
                variant="outline"
                className="mt-4"
                onClick={onRetry}
            >
                Try again
            </Button>

        </div>
    );
}

function PlansPage() {
    const page =
        useMerchantPlansPage();

    console.log("Page GRACIOUSLY arrived at");

    ////////////////////////////////////////////////////////////
    // MERCHANT ACCOUNT STATES
    ////////////////////////////////////////////////////////////

    if (
        page.merchant.status ===
            "disconnected" ||
        page.merchant.status ===
            "waiting" ||
        page.merchant.status ===
            "loading"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlansLoadingState />
                </Container>
            </Page>
        );
    }

    // GRACIOUS TODO: Disconnecting a  wallet..
    // 1. In the midst of onboarding, should result in the onboarding process halted(returned to user form so as to connect back to browser wallet)
    // 2. While in the dashboard, disconnecting the wallet, should cause the respective dashboard's page return its corresponding skeleton (for a fixed sufficiently short time) then a "Wallet Disconnected" error message ui

    // GRACIOUS TODO: 
    // There are yet sonner toast-messages to be included in every page for every response, 
    // GRACIOUS TODO: Graced Error handling

    // GRACIOUS TODO: A gracious todo involves including a chat feature into the app(rooms are identified by plan), the chat rooms are also monitored, for support across merchants, customers and the protocol, in-app chats are also considered.

    if (
        page.merchant.status ===
        "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">

                    <PlansErrorState
                        error={
                            page.merchant.error ??
                            new Error(
                                "Unable to load merchant.",
                            )
                        }
                        onRetry={
                            page.merchant.refresh
                        }
                    />

                </Container>
            </Page>
        );
    }

    if (
        page.merchant.status ===
        "not-created"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">

                    <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                        <p className="text-lg font-semibold">
                            Merchant account not found
                        </p>

                        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                            The connected wallet does not currently have a merchant record.
                        </p>

                        <Button
                            className="mt-5"
                            render={
                                <Link href="/merchant/onboarding">
                                    Complete onboarding
                                </Link>
                            }
                        />

                    </div>

                </Container>
            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // PAGE
    ////////////////////////////////////////////////////////////

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Plans"
                        title="Plans"
                        description={
                            `Create and manage the billing plans ${
                                page.merchant.data?.name ??
                                "your merchant"
                            } offers to customers.`
                        }
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled
                                >
                                    Export
                                </Button>

                                <Button
                                    render={
                                        <Link href="/dashboard/platform/plans/create">
                                            Create plan
                                        </Link>
                                    }
                                >
                                    <Plus />
                                    Create plan
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <PlansOverview
                        summary={
                            page.summary
                        }
                    />

                    <Section
                        title="Plan management"
                        description="Search, filter, and manage the plans available to your customers."
                    >

                        <Stack gap={4}>

                            <PlansToolbar
                                search={
                                    page.filters.search
                                }

                                status={
                                    page.filters.status
                                }

                                interval={
                                    page.filters.interval
                                }

                                refreshing={
                                    page.plans.refreshing
                                }

                                onSearchChange={
                                    page.filters.setSearch
                                }

                                onStatusChange={
                                    page.filters.setStatus
                                }

                                onIntervalChange={
                                    page.filters.setInterval
                                }

                                onRefresh={
                                    () =>
                                        void page.plans.refresh()
                                }
                            />

                            {page.plans.loading &&
                            page.plans.data.length ===
                                0 ? (
                                <PlansLoadingState />
                            ) : page.plans.error &&
                              page.plans.data.length ===
                                0 ? (
                                <PlansErrorState
                                    error={
                                        page.plans.error
                                    }
                                    onRetry={
                                        page.plans.refresh
                                    }
                                />
                            ) : page.plans.filteredCount ===
                              0 ? (
                                <div className="rounded-xl border border-dashed bg-card p-10 text-center">

                                    <p className="font-medium">
                                        No plans match your filters
                                    </p>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Try changing your search or filters.
                                    </p>

                                </div>
                            ) : (
                                <>
                                    <PlansTable
                                        plans={page.plans.data}

                                        onPause={
                                            page.planActions.pause
                                        }

                                        onActivate={
                                            page.planActions.activate
                                        }

                                        onArchive={
                                            page.planActions.archive
                                        }
                                    />

                                    <PlansPagination
                                        total={
                                            page.plans.filteredCount
                                        }

                                        page={
                                            page.filters.page
                                        }

                                        pageSize={
                                            page.filters.pageSize
                                        }

                                        onPageChange={
                                            page.filters.setPage
                                        }
                                    />
                                </>
                            )}

                        </Stack>

                    </Section>

                    {page.plans.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing plans...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}
