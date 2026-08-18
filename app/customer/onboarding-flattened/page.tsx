"use client";

import {
    useEffect,
} from "react";
import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"


import {
    ArrowRight,
} from "lucide-react";
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cva, type VariantProps } from "class-variance-authority"


import { Input as InputPrimitive } from "@base-ui/react/input"


import {
    usePrivy,
} from "@privy-io/react-auth";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"


import { mergeProps } from "@base-ui/react/merge-props"

import { useRender } from "@base-ui/react/use-render"

import Link from "next/link";
import type {
    Address,
} from "viem";
import {
    usePublicClient,
    useWalletClient,
} from "wagmi";
import {
    CustomerClient,
} from "@stripe-for-web3/customer";

/* ============================================================
   FLATTENED SOURCE: app\customer\onboarding\page.tsx
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
   FLATTENED SOURCE: components\onboarding\CustomerOnboardingForm.tsx
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
   FLATTENED SOURCE: components\wallet\WalletButton.tsx
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



////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

function shortenAddress(
    address?: string,
): string {
    if (!address) {
        return "Not connected";
    }

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface WalletButtonProps {
    label?: string;

    compact?: boolean;
}

////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////

function WalletButton({
    label = "Wallet",
    compact = false,
}: WalletButtonProps) {
    const {
        ready,
        authenticated,
        user,
        login,
        logout,
    } = usePrivy();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (!ready) {
        return (
            <div className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2">

                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>

                {!compact && (
                    <div className="hidden sm:block">
                        <p className="text-xs text-muted-foreground">
                            {label}
                        </p>

                        <p className="text-sm font-medium">
                            Connecting...
                        </p>
                    </div>
                )}

            </div>
        );
    }

    const address =
        user?.wallet?.address;

    ////////////////////////////////////////////////////////////
    // DISCONNECTED
    ////////////////////////////////////////////////////////////

    if (!authenticated) {
        return (
            <div className="flex items-center gap-2">

                {!compact && (
                    <div className="hidden text-right sm:block">

                        <p className="text-xs text-muted-foreground">
                            {label}
                        </p>

                        <p className="text-sm font-medium">
                            Not connected
                        </p>

                    </div>
                )}

                <Button
                    onClick={login}
                    variant="outline"
                >
                    <WalletCards />
                    Connect
                </Button>

            </div>
        );
    }

    ////////////////////////////////////////////////////////////
    // CONNECTED
    ////////////////////////////////////////////////////////////

    return (
        <div className="flex items-center gap-2">

            <div className="hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 sm:flex">

                <Avatar className="size-7">

                    <AvatarFallback>
                        <WalletCards className="size-3.5" />
                    </AvatarFallback>

                </Avatar>

                <div>

                    <div className="flex items-center gap-2">

                        <p className="text-xs font-medium">
                            {label}
                        </p>

                        <Badge
                            variant="secondary"
                            className="h-5 px-1.5 text-[10px]"
                        >
                            <Check />
                            Connected
                        </Badge>

                    </div>

                    <p className="font-mono text-[11px] text-muted-foreground">
                        {shortenAddress(address)}
                    </p>

                </div>

            </div>

            <Button
                onClick={logout}
                variant="ghost"
                size={compact ? "icon" : "sm"}
                aria-label="Disconnect wallet"
            >
                {compact ? (
                    <LogOut />
                ) : (
                    <>
                        <LogOut />
                        Disconnect
                    </>
                )}
            </Button>

        </div>
    );
}



interface CustomerOnboardingFormProps {
    onSubmit: (
        input: {
            displayName: string;

            email: string;
        },
    ) => Promise<unknown>;

    loading: boolean;

    disabled?: boolean;

    error:
        | Error
        | null;
}

function CustomerOnboardingForm({
    onSubmit,
    loading,
    disabled = false,
    error,
}: CustomerOnboardingFormProps) {

    const [
        displayName,
        setDisplayName,
    ] = useState("");

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        validationError,
        setValidationError,
    ] =
        useState<string | null>(
            null,
        );

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setValidationError(
            null,
        );

        if (!displayName.trim()) {
            setValidationError(
                "Please enter your name.",
            );

            return;
        }

        if (!email.trim()) {
            setValidationError(
                "Please enter your email address.",
            );

            return;
        }

        await onSubmit({
            displayName,

            email,
        });
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="space-y-6"
        >

            <div className="space-y-2">

                <Label htmlFor="customer-name">
                    Name
                </Label>

                <Input
                    id="customer-name"
                    value={displayName}
                    onChange={(event) =>
                        setDisplayName(
                            event.target.value,
                        )
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={
                        loading ||
                        disabled
                    }
                />

            </div>

            <div className="space-y-2">

                <Label htmlFor="customer-email">
                    Email
                </Label>

                <Input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value,
                        )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={
                        loading ||
                        disabled
                    }
                />

                <p className="text-xs text-muted-foreground">
                    Used for customer notifications and account communication.
                </p>

            </div>

            {validationError && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                    {validationError}
                </div>
            )}

            {error && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                    {error.message}
                </div>
            )}

            <WalletButton
                label="Customer wallet"
            />

            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                    loading ||
                    disabled
                }
            >
                {loading
                    ? "Creating your Smart Account..."
                    : "Create customer account"}

                {!loading && (
                    <ArrowRight />
                )}
            </Button>

        </form>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\onboarding\OnboardingHeader.tsx
   ============================================================ */



function OnboardingHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div>

            <Badge variant="secondary">
                {eyebrow}
            </Badge>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {description}
            </p>

        </div>
    );
}


/* ============================================================
   FLATTENED SOURCE: components\onboarding\OnboardingShell.tsx
   ============================================================ */



function OnboardingShell({
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


/* ============================================================
   FLATTENED SOURCE: hooks\onboarding\useCustomerOnboardingPage.tsx
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
    } = usePrivy();

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

    // description:
    //     "Intelligent workflow automation for modern teams.",

    apiUrl:
        process.env.NEXT_PUBLIC_API_URL as string,

    billingContractAddress:
        process.env.NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS as Address
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
    walletClient: WalletClient;

    publicClient: PublicClient;
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



////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

function useCustomerClient() {
    const {
        data: walletClient,
    } = useWalletClient();

    const publicClient =
        usePublicClient();

    const client =
        useMemo(() => {

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

        }, [
            walletClient,

            publicClient,
        ]);

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
   FLATTENED SOURCE: hooks\customer\useCustomerByWallet.ts
   ============================================================ */



////////////////////////////////////////////////////////////
// RESULT
////////////////////////////////////////////////////////////

type CustomerLookupStatus =
    | "disconnected"
    | "loading"
    | "ready"
    | "not-created"
    | "error";

interface CustomerLookupState {
    status: CustomerLookupStatus;

    customer:
        | Awaited<
            ReturnType<
                CustomerClient["getByWallet"]
            >
        >
        | null;

    error:
        | Error
        | null;

    refresh:
        () => Promise<void>;
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

function useCustomerByWallet({
    client,
    address,
}: {
    client:
        | CustomerClient
        | null;

    address:
        | Address
        | undefined;
}): CustomerLookupState {

    const [
        status,
        setStatus,
    ] =
        useState<CustomerLookupStatus>(
            "disconnected",
        );

    const [
        customer,
        setCustomer,
    ] = 
        useState<
            Awaited<
                ReturnType<
                    CustomerClient["getByWallet"]
                >
            >
            | null
        >(null);

    const [
        error,
        setError,
    ] =
        useState<Error | null>(
            null,
        );

    const load =  
        useCallback(
            async () => {

                if (
                    !client ||
                    !address
                ) {
                    setStatus(
                        "disconnected",
                    );

                    setCustomer(
                        null,
                    );

                    return;
                }

                setStatus(
                    "loading",
                );

                setError(
                    null,
                );

                try {

                    const result =
                        await client.getByWallet(
                            address,
                        );

                    setCustomer(
                        result ?? null,
                    );

                    setStatus(
                        result
                            ? "ready"
                            : "not-created",
                    );

                } catch (
                    cause
                ) {

                    const normalized =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to load customer.",
                            );

                    setError(
                        normalized,
                    );

                    setStatus(
                        "error",
                    );
                }

            },
            [
                client,
                address,
            ],
        );

    useEffect(() => {
        void load();
    }, [load]);

    return {
        status,

        customer,

        error,

        refresh:
            load,
    };
}



////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////

type OnboardingStatus =
    | "idle"
    | "checking"
    | "ready"
    | "registering"
    | "complete"
    | "error";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

function useCustomerOnboardingPage() {

    ////////////////////////////////////////////////////////////
    // WALLET
    ////////////////////////////////////////////////////////////

    const {
        ready:
            walletReady,

        authenticated,

        address,
    } =
        useConnectedWallet();

    ////////////////////////////////////////////////////////////
    // SDK
    ////////////////////////////////////////////////////////////

    const {
        client,

        ready:
            clientReady,
    } =
        useCustomerClient();

    ////////////////////////////////////////////////////////////
    // CUSTOMER RESOURCE
    ////////////////////////////////////////////////////////////

    const {
        status:
            customerStatus,

        customer,

        error:
            customerError,

        refresh:
            refreshCustomer,
    } =
        useCustomerByWallet({
            client,

            address:
                address as
                    | Address
                    | undefined,
        });

    ////////////////////////////////////////////////////////////
    // REGISTRATION STATE
    ////////////////////////////////////////////////////////////

    const [
        registrationLoading,
        setRegistrationLoading,
    ] =
        useState(false);

    const [
        registrationError,
        setRegistrationError,
    ] =
        useState<Error | null>(
            null,
        );

    ////////////////////////////////////////////////////////////
    // REGISTER
    ////////////////////////////////////////////////////////////

    const register =
        useCallback(
            async ({
                displayName,
                email,
            }: {
                displayName: string;

                email: string;
            }) => {

                if (!client) {
                    throw new Error(
                        "Customer client is not ready.",
                    );
                }

                if (!address) {
                    throw new Error(
                        "Connect your wallet first.",
                    );
                }

                setRegistrationLoading(
                    true,
                );

                setRegistrationError(
                    null,
                );

                try {

                    const result =
                        await client.register({
                            displayName:
                                displayName.trim(),

                            email:
                                email.trim(),
                        });

                    ////////////////////////////////////////////////////
                    // REFRESH THE RESOURCE
                    ////////////////////////////////////////////////////

                    await refreshCustomer();

                    return result;

                } catch (
                    cause
                ) {

                    const normalized =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to create customer.",
                            );

                    setRegistrationError(
                        normalized,
                    );

                    throw normalized;

                } finally {

                    setRegistrationLoading(
                        false,
                    );

                }
            },
            [
                client,

                address,

                refreshCustomer,
            ],
        );

    ////////////////////////////////////////////////////////////
    // DERIVED STATUS
    ////////////////////////////////////////////////////////////

    const status: OnboardingStatus =
        !walletReady ||
        !authenticated
            ? "idle"
            : !clientReady
                ? "checking"
                : customerStatus === "loading"
                    ? "checking"
                    : registrationLoading
                        ? "registering"
                        : customerStatus === "ready"
                            ? "ready"
                            : customerStatus === "not-created"
                                ? "idle"
                                : customerStatus === "error"
                                    ? "error"
                                    : "idle";

    return {
        status,

        walletReady,

        authenticated,

        address,

        clientReady,

        customer,

        customerStatus,

        customerError,

        registrationLoading,

        registrationError,

        register,

        refreshCustomer,
    };
}



function CustomerOnboardingPage() {

    const onboarding =
        useCustomerOnboardingPage();

    useEffect(() => {

        if (
            onboarding.customer &&
            onboarding.customerStatus ===
                "ready"
        ) {
            // Placeholder navigation.
            //
            // Later:
            // router.push("/portal");
        }

    }, [
        onboarding.customer,
        onboarding.customerStatus,
    ]);

    return (
        <OnboardingShell>

            <Page>

                <Container className="py-12">

                    <div className="mx-auto max-w-2xl">

                        <OnboardingHeader
                            eyebrow="Customer onboarding"
                            title="Create your Smart Account"
                            description="Connect your wallet and create your Stripe for Web3 customer account so you can manage subscriptions and billing."
                        />

                        <Card className="mt-8">

                            <CardContent className="pt-6">

                                <CustomerOnboardingForm
                                    onSubmit={
                                        onboarding.register
                                    }

                                    loading={
                                        onboarding.registrationLoading
                                    }

                                    disabled={
                                        !onboarding.authenticated
                                    }

                                    error={
                                        onboarding.registrationError
                                        ??
                                        onboarding.customerError
                                    }
                                />

                            </CardContent>

                        </Card>

                    </div>

                </Container>

            </Page>

        </OnboardingShell>
    );
}
