import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"


import Link from "next/link";
import {
    Bell,
    Code2,
    CreditCard,
    Lock,
    Settings2,
    ShieldAlert,
} from "lucide-react";
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cva, type VariantProps } from "class-variance-authority"


import { Input as InputPrimitive } from "@base-ui/react/input"


import { Select as SelectPrimitive } from "@base-ui/react/select"


import { Switch as SwitchPrimitive } from "@base-ui/react/switch"


import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"


/* ============================================================
   FLATTENED SOURCE: app\dashboard\account\settings\page.tsx
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
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsSidebar.tsx
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


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\MerchantSettingsNavigation.tsx
   ============================================================ */



const items = [
    {
        label: "General",
        href: "#general",
        icon: Settings2,
    },
    {
        label: "Billing",
        href: "#billing",
        icon: CreditCard,
    },
    {
        label: "Notifications",
        href: "#notifications",
        icon: Bell,
    },
    {
        label: "Developers",
        href: "#developers",
        icon: Code2,
    },
    {
        label: "Security",
        href: "#security",
        icon: Lock,
    },
    {
        label: "Danger zone",
        href: "#danger",
        icon: ShieldAlert,
    },
];

function MerchantSettingsNavigation() {
    return (
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1">

            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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



function SettingsSidebar() {
    return (
        <Card className="lg:sticky lg:top-24 lg:self-start">

            <CardContent className="p-2 lg:p-3">

                <MerchantSettingsNavigation />

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\MerchantIdentitySettings.tsx
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
   FLATTENED SOURCE: components\ui\label.tsx
   ============================================================ */



function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}


/* ============================================================
   FLATTENED SOURCE: components\ui\textarea.tsx
   ============================================================ */



function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsSection.tsx
   ============================================================ */



interface SettingsSectionProps {
    title: string;

    description: string;

    children: React.ReactNode;
}

function SettingsSection({
    title,
    description,
    children,
}: SettingsSectionProps) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    {title}
                </CardTitle>

                <CardDescription>
                    {description}
                </CardDescription>

            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

        </Card>
    );
}



interface MerchantIdentitySettingsProps {
    merchantId: number;

    initialName: string;

    initialMetadataUri: string;
}

function MerchantIdentitySettings({
    merchantId,
    initialName,
    initialMetadataUri,
}: MerchantIdentitySettingsProps) {
    const [
        name,
        setName,
    ] = useState(initialName);

    const [
        metadataUri,
        setMetadataUri,
    ] = useState(
        initialMetadataUri,
    );

    async function copyMerchantId() {
        await navigator.clipboard.writeText(
            String(merchantId),
        );
    }

    return (
        <SettingsSection
            title="Merchant identity"
            description="Configure the public identity information associated with your merchant."
        >

            <div className="space-y-6">

                <div className="space-y-2">

                    <Label htmlFor="merchant-name">
                        Merchant name
                    </Label>

                    <Input
                        id="merchant-name"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value,
                            )
                        }
                        placeholder="Your brand name"
                    />

                    <p className="text-xs text-muted-foreground">
                        This is the merchant or brand name displayed throughout Stripe for Web3.
                    </p>

                </div>

                <div className="space-y-2">

                    <Label htmlFor="metadata-uri">
                        Metadata URI
                    </Label>

                    <Textarea
                        id="metadata-uri"
                        value={metadataUri}
                        onChange={(event) =>
                            setMetadataUri(
                                event.target.value,
                            )
                        }
                        placeholder="ipfs://..."
                        className="min-h-20 font-mono text-xs"
                    />

                    <p className="text-xs text-muted-foreground">
                        URI pointing to the merchant metadata associated with this merchant.
                    </p>

                </div>

                <div className="space-y-2">

                    <Label>
                        Merchant ID
                    </Label>

                    <div className="flex gap-2">

                        <Input
                            value={
                                String(
                                    merchantId,
                                )
                            }
                            readOnly
                            className="font-mono"
                        />

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={
                                copyMerchantId
                            }
                            aria-label="Copy merchant ID"
                        >
                            <Copy />
                        </Button>

                    </div>

                    <p className="text-xs text-muted-foreground">
                        Your protocol-level merchant identifier.
                    </p>

                </div>

            </div>

        </SettingsSection>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsBilling.tsx
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



function SettingsBilling() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Billing preferences
                </CardTitle>

                <CardDescription>
                    Configure default billing behavior for your merchant.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="space-y-2">

                    <Label>
                        Default billing environment
                    </Label>

                    <Select defaultValue="test">

                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="test">
                                Test
                            </SelectItem>

                            <SelectItem value="live">
                                Live
                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <p className="text-xs text-muted-foreground">
                        This does not change existing subscriptions or credentials.
                    </p>

                </div>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="text-sm font-medium">
                        Billing behavior
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Subscription-specific billing settings remain controlled
                        by individual plans and subscriptions.
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsNotifications.tsx
   ============================================================ */


/* ============================================================
   FLATTENED SOURCE: components\ui\switch.tsx
   ============================================================ */



function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}



function SettingsNotifications() {
    return (
        <SettingsSection
            title="Notifications"
            description="Control default operational notifications for your merchant."
        >

            <div className="space-y-6">

                <NotificationSetting
                    id="billing-notifications"
                    title="Billing alerts"
                    description="Notify administrators when billing failures or unusual billing events occur."
                    defaultChecked
                />

                <NotificationSetting
                    id="operational-notifications"
                    title="Operational alerts"
                    description="Notify administrators when infrastructure, webhooks, or integrations require attention."
                    defaultChecked
                />

                <NotificationSetting
                    id="security-notifications"
                    title="Security alerts"
                    description="Notify administrators about sensitive account or credential events."
                    defaultChecked
                />

            </div>

        </SettingsSection>
    );
}

function NotificationSetting({
    id,
    title,
    description,
    defaultChecked,
}: {
    id: string;
    title: string;
    description: string;
    defaultChecked: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-6 border-b pb-5 last:border-0 last:pb-0">

            <div className="space-y-1">

                <Label
                    htmlFor={id}
                    className="text-sm font-medium"
                >
                    {title}
                </Label>

                <p className="text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

            </div>

            <Switch
                id={id}
                defaultChecked={
                    defaultChecked
                }
            />

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsDeveloper.tsx
   ============================================================ */



function SettingsDeveloper() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Developer configuration
                </CardTitle>

                <CardDescription>
                    Manage integration defaults without exposing credentials.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

                <DeveloperLink
                    title="API keys"
                    description="Create, revoke, and manage merchant API credentials."
                    href="/dashboard/developers"
                />

                <DeveloperLink
                    title="Webhooks"
                    description="Configure event delivery endpoints and signing secrets."
                    href="/dashboard/webhooks"
                />

            </CardContent>

        </Card>
    );
}

function DeveloperLink({
    title,
    description,
    href,
}: {
    title: string;
    description: string;
    href: string;
}) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

                <p className="text-sm font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

            </div>

            <Button
                render={
                    <a href={href}>
                        Open
                        <ExternalLink />
                    </a>
                }
                variant="outline"
                size="sm"
            />


        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsSecurity.tsx
   ============================================================ */



function SettingsSecurity() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Security
                </CardTitle>

                <CardDescription>
                    Control confirmation behavior for sensitive merchant actions.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex items-start justify-between gap-6">

                    <div className="space-y-1">

                        <Label
                            htmlFor="sensitive-confirmation"
                            className="text-sm font-medium"
                        >
                            Confirm sensitive actions
                        </Label>

                        <p className="text-xs leading-5 text-muted-foreground">
                            Require an explicit confirmation step before
                            destructive or authorization-sensitive actions.
                        </p>

                    </div>

                    <Switch
                        id="sensitive-confirmation"
                        defaultChecked
                    />

                </div>

                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">

                    <p className="text-sm font-medium">
                        Security reminder
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        API keys and webhook signing secrets should never be
                        committed to source control or exposed to browser clients.
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\DangerZone.tsx
   ============================================================ */



function DangerZone() {
    return (
        <Card
            id="danger"
            className="border-destructive/30"
        >

            <CardHeader>

                <CardTitle className="text-destructive">
                    Danger zone
                </CardTitle>

                <CardDescription>
                    Actions here can affect the availability of your merchant.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

                <div className="flex flex-col gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex gap-3">

                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />

                        <div>

                            <p className="text-sm font-medium">
                                Disable merchant
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Disable the merchant's active operations.
                                Existing historical data remains available.
                            </p>

                        </div>

                    </div>

                    <Button
                        variant="destructive"
                        size="sm"
                    >
                        Disable merchant
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\dashboard\account\settings\SettingsStatus.tsx
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



function SettingsStatus({
    dirty = false,
}: {
    dirty?: boolean;
}) {
    if (dirty) {
        return (
            <Badge variant="outline">
                <Cloud />
                Unsaved changes
            </Badge>
        );
    }

    return (
        <Badge variant="secondary">
            <CheckCircle2 />
            Saved
        </Badge>
    );
}



function SettingsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Merchant settings"
                        title="Settings"
                        description="Configure your merchant identity, billing behavior, notifications, developer integrations, and security preferences."
                        actions={
                            <SettingsStatus />
                        }
                    />

                    <Divider />

                    {/* SETTINGS */}

                    <Grid className="grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">

                        <SettingsSidebar />

                        <div className="min-w-0">

                            <Stack gap={6}>

                                <div id="general">

                                    <MerchantIdentitySettings
                                        merchantId={12}
                                        initialName="ACMEFLOW"
                                        initialMetadataUri="ipfs://example-merchant-metadata"
                                    />

                                </div>

                                <div id="billing">

                                    <SettingsBilling />

                                </div>

                                <div id="notifications">

                                    <SettingsNotifications />

                                </div>

                                <div id="developers">

                                    <SettingsDeveloper />

                                </div>

                                <div id="security">

                                    <SettingsSecurity />

                                </div>

                                <DangerZone />

                            </Stack>

                        </div>

                    </Grid>

                </Stack>

            </Container>

        </Page>
    );
}
